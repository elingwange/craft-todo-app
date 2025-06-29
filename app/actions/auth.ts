'use server';
import { db } from '@/db';
import { users } from '@/db/schema';
import {
  createUser,
  createSession,
  getSession,
  hashPassword,
  deleteSession,
  verifyPassword,
} from '@/lib/auth';
import { getUserByEmail } from '@/lib/dal';
import { mockDelay } from '@/lib/utils';
import { zhHK } from 'date-fns/locale';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export async function signIn(formData: FormData): Promise<ActionResponse> {
  try {
    // Add a small delay to simulate network latency
    await mockDelay(700);

    // Extract data from form
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    // Validate with Zod
    const validationResult = SignInSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Find user by email
    const user = await getUserByEmail(data.email);
    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
        errors: {
          email: ['Invalid email or password'],
        },
      };
    }

    // Verify password
    const isPasswordValid = await verifyPassword(data.password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password',
        errors: {
          password: ['Invalid email or password'],
        },
      };
    }

    // Create session
    await createSession(user.id);

    return {
      success: true,
      message: 'Signed in successfully',
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      message: 'An error occurred while signing in',
      error: 'Failed to sign in',
    };
  }
}
const signupSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
});

export async function signUp(formData: FormData): Promise<ActionResponse> {
  try {
    // Get form data
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    // Validate with Zod
    const validationResult = signupSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Find user by email
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists',
        errors: {
          email: ['User with this email already exists'],
        },
      };
    }

    // Create new user
    const user = await createUser(data.email, data.password);
    if (!user) {
      return {
        success: false,
        message: 'Failed to create user',
        error: 'Failed to create user',
      };
    }

    // Create session for the newly registered user
    await createSession(user.id);

    const session = await getSession();
    console.log('---- get session-> ', session);

    return {
      success: true,
      message: 'Account created successfully',
    };
  } catch (error) {
    console.error('Error sing up:', error);
    return {
      success: false,
      message: 'Sign up failed',
      error: 'Sign up failed',
    };
  }
}

export async function signOut(): Promise<void> {
  try {
    await mockDelay(300);
    await deleteSession();
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out');
  } finally {
    redirect('/signin');
  }
}
