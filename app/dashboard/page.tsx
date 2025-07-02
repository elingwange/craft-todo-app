import Link from 'next/link';
import { HomeIcon, ListChecks, PlusIcon, UserIcon } from 'lucide-react';
import SignOutButton from '../components/LoginOutButton';
import { getCurrentUser } from '@/lib/dal';
import IssuesOverview from '../components/IssuesOverview';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <div className='flex w-full h-screen'>
      <aside className='flex flex-col w-20 md:w-96 h-screen bg-slate-50 px-6 py-6 transition-all duration-300 dark:bg-[#1A1A1A]'>
        <Link
          href='/'
          className='text-2xl font-serif font-semibold text-gray-900 leading-tight dark:text-gray-100 mb-10 ml-2'
        >
          <span className=' hidden md:block'>Craft</span>
          <span className=' md:hidden'>C</span>
        </Link>
        <Link
          href='/'
          className='flex items-center px-2 py-3 text-sm font-medium rounded-md group text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        >
          <span className='text-gray-500 dark:text-gray-400 mr-3'>{<HomeIcon size={20} />}</span>
          <span className='hidden md:inline'>Dashboard</span>
        </Link>

        <Link
          href={'/issues'}
          className='flex items-center px-2 py-3 text-sm font-medium rounded-md group text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        >
          <span className='text-gray-500 dark:text-gray-400 mr-3'>{<ListChecks size={20} />}</span>
          <span className='hidden md:inline'>All Issues</span>
        </Link>

        <Link
          href={'/issues/new'}
          className='flex items-center px-2 py-3 text-sm font-medium rounded-md group text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        >
          <span className='text-gray-500 dark:text-gray-400 mr-3'>{<PlusIcon size={20} />}</span>
          <span className='hidden md:inline'>New Issue</span>
        </Link>

        <section className='mt-auto'>
          <div className='h-px bg-gray-200 dark:bg-gray-700 my-4 w-full' />
          <Link
            id='signout'
            href='/'
            className='flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700  dark:text-gray-300'
          >
            <span className='text-gray-500 dark:text-gray-400 mr-3'>
              <UserIcon size={20} />
            </span>
            <span className='hidden md:inline'>{user?.email}</span>
          </Link>

          <SignOutButton />
        </section>
      </aside>

      <main className='flex flex-col w-full h-screen  overflow-y-auto'>
        <IssuesOverview />
      </main>
    </div>
  );
}
