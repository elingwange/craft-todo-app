import { compare, hash } from 'bcrypt';
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { users } from '@/db/schema';
import * as jose from 'jose';
import { cache } from 'react';

// Hash a password
export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function createUser(email: string, password: string) {
  console.log('----- createUser()');
  const hashedPassword = await hashPassword(password);
  const id = nanoid();

  try {
    const data = {
      id,
      email,
      password: hashedPassword,
    };
    console.log('----- insert data-> ', data);

    await db.insert(users).values(data);

    return { id, email };
  } catch (error) {
    console.log('----- error-> ', error);
    return null;
  }
}

// JWT types
interface JWTPayload {
  userId: string;
  [key: string]: string | number | boolean | null | undefined;
}

// JWT expiration time
const JWT_EXPIRATION = '7d'; // 7 days

// Secret key for JWT signing (in a real app, use an environment variable)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!!'
);

// Generate a JWT token
export async function generateJWT(payload: JWTPayload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
}

// Verify a JWT token
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export async function createSession(userId: string) {
  try {
    const token = await generateJWT({ userId });

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    });
    return true;
  } catch (error) {
    console.error('Error creating session:', error);
    return false;
  }
}

export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return null;

    const payload = await verifyJWT(token as string);

    return payload ? { userId: payload.userId } : null;
  } catch (error) {
    // Handle the specific prerendering error
    if (
      error instanceof Error &&
      error.message.includes('During prerendering, `cookies()` rejects')
    ) {
      console.log('Cookies not available during prerendering, returning null session');
      return null;
    }

    console.error('Error getting session:', error);
    return null;
  }
});
