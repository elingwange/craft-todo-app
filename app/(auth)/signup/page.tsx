'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormError,
  FormGroup,
  FormInput,
  FormLabel,
} from '@/app/components/compound/Form/Form';
import Button from '@/app/components/basic/Button';
import AuthPageLayout from '@/app/components/layout/AuthPageLayout';
import { ActionResponse, signUp } from '@/app/actions/auth';
import toast from 'react-hot-toast';

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
};

export default function SignUpPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(
    async (prevState: ActionResponse, formData: FormData) => {
      try {
        const result = await signUp(formData);
        console.error('result signing up:', result);

        if (result.success) {
          toast.success('Account created successfully');
          router.push('/dashboard');
        }
        return result;
      } catch (error) {
        console.error('Error signing up:', error);
        return {
          success: false,
          message: (error as Error).message || 'An error occurred',
          errors: undefined,
        };
      }
    },
    initialState
  );

  return (
    <AuthPageLayout title='Create a new account.'>
      <Form action={formAction}>
        {!state.success && state?.message && <FormError>{state?.message}</FormError>}

        <FormGroup>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <FormInput
            id='email'
            name='email'
            type='email'
            required
            disabled={isPending}
            autoComplete='email'
            aria-describedby='email-error'
          />
          {state?.errors?.email && (
            <p id='email_error' className='text-sm text-red-500'>
              {state.errors.email[0]}
            </p>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <FormInput
            id='password'
            name='password'
            type='password'
            required
            disabled={isPending}
            autoComplete='new-password'
            aria-describedby='email-error'
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
          <FormInput
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            disabled={isPending}
            aria-describedby='email-error'
            autoComplete='new-password'
            required
          />
        </FormGroup>
        <Button className='w-full' disabled={isPending}>
          {isPending ? 'Signing up...' : 'Sign up'}
        </Button>
      </Form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Already have an account?{' '}
          <Link
            href='/signin'
            className='font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthPageLayout>
  );
}
