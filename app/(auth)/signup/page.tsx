'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, FormGroup, FormInput, FormLabel } from '@/app/components/ui/Form';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const json = JSON.stringify({ email, password, password2 });
    console.log(json);

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <main className=' bg-slate-100 h-screen flex flex-col justify-center dark:bg-gray-900'>
      <div className=''>
        <section className='flex flex-col p-2 items-center justify-center'>
          <h1 className='text-3xl md:text-2xl font-serif font-semibold text-gray-900 leading-tight dark:text-gray-100'>
            Craft
          </h1>
          <h3 className=' text-2xl font-semibold pt-2 px-3'>Create a new account.</h3>
        </section>
        <section className='flex flex-col p-10 bg-white dark:bg-gray-800 mt-5 items-center max-w-[500px] mx-auto border dark:border-gray-800 rounded-lg shadow'>
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
            <button
              className='p-2 rounded-md my-7 bg-theme-coffee w-full dark:bg-amber-900'
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </Form>

          <div className=' text-center'>
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
        </section>
      </div>
    </main>
  );
}
