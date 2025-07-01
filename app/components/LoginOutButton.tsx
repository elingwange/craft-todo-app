'use client';

import { LogOutIcon } from 'lucide-react';
import { useTransition } from 'react';
import { signOut } from '@/app/actions/auth';

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className='flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    >
      <span className='text-gray-500 dark:text-gray-400 mr-3'>
        <LogOutIcon size={20} />
      </span>
      <span className='hidden md:inline'>{isPending ? 'Signing out...' : 'Sign Out'}</span>
    </button>
  );
}
