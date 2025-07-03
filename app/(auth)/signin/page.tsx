'use client';

import Link from 'next/link';
import { useState, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, FormGroup, FormInput, FormLabel } from '@/app/components/ui/Form';
import { ActionResponse, signIn } from '@/app/actions/auth';
import toast from 'react-hot-toast';
import Button from '@/app/components/ui/Button';
import AuthPageLayout from '@/app/components/AuthPageLayout';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
  };

  const [, formAction, isPending] = useActionState<ActionResponse, FormData>(
    async (_, formData: FormData) => {
      const result = await signIn(formData);

      toast.success('Signed in successfully');
      router.push('/dashboard');
      router.refresh();

      return result;
    },
    initialState
  );

  return (
    <AuthPageLayout title='Sign in to your account.'>
      <Form action={formAction}>
        <FormGroup>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <FormInput
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            aria-describedby='email-error'
            autoComplete='email'
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <FormInput
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby='password-error'
            type='password'
            required
          />
        </FormGroup>
        <Button className='w-full' disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign in'}
        </Button>
      </Form>
      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Don&apos;t have an account?{' '}
          <Link
            href='/signup'
            className='font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthPageLayout>
  );
}
