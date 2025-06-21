'use server';
import { mockDelay } from '@/lib/utils';

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export async function signIn(formData: FormData): Promise<ActionResponse> {
  console.log('------- signIn->', formData);

  await mockDelay(2000);

  return {
    success: false,
    message: '我不高兴让你登录',
    errors: {
      email: ['邮箱地址就不对！'],
    },
  };
}
