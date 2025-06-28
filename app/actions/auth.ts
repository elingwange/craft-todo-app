'use server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { createUser, createSession, getSession, hashPassword } from '@/lib/auth';
import { getUserByEmail } from '@/lib/dal';
import { mockDelay } from '@/lib/utils';
import { zhHK } from 'date-fns/locale';
import { z } from 'zod';

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export async function signIn(formData: FormData): Promise<ActionResponse> {
  // 校验参数，email, password
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  // 查询用户
  const hashedPassword = hashPassword(data.password);
  const result = await db.select().from(users).where(eq(users.email, data.email));
  // 创建session

  // 返回结果

  return {
    success: false,
    message: '我不高兴让你登录',
    errors: {
      email: ['邮箱地址就不对！'],
    },
  };
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
