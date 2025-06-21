// components/layout/AuthPageLayout.tsx

import React from 'react';

export default function AuthPageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen flex flex-col justify-center bg-slate-100 dark:bg-gray-900'>
      <section className='flex flex-col items-center text-center space-y-3'>
        <h1 className='text-3xl font-bold font-serif text-gray-900 dark:text-white'>Craft</h1>
        {title && (
          <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>{title}</h2>
        )}
        {subtitle && <p className='text-sm text-gray-600 dark:text-gray-100'>{subtitle}</p>}
      </section>

      <section className='mt-9 bg-white dark:bg-gray-800 max-w-md w-full mx-auto p-8 rounded-lg shadow'>
        {children}
      </section>
    </main>
  );
}
