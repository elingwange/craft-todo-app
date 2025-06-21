'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, FormGroup, FormInput, FormLabel } from '@/app/components/ui/Form';
import Button from '@/app/components/ui/Button';
import AuthPageLayout from '@/app/components/AuthPageLayout';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const router = useRouter();

  const isPending = false;

  return (
    <AuthPageLayout title='Create a new account.'>
      <Form>
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
            value={email}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            aria-describedby='email-error'
            autoComplete='password'
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='password2'>Confirm Password</FormLabel>
          <FormInput
            id='password2'
            name='password2'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type='password'
            aria-describedby='email-error'
            autoComplete='password2'
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
