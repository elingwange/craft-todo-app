import Link from 'next/link';
import { HomeIcon, PlusIcon, UserIcon } from 'lucide-react';
import IssueList from '../components/IssueList';
import SignOutButton from '../components/LoginOutButton';

export default async function DashboardPage() {
  return (
    <div className='flex w-full h-screen'>
      <div className='flex flex-col w-20 md:w-96 h-screen bg-slate-50 px-6 py-4 transition-all duration-300 dark:bg-[#1A1A1A]'>
        <Link
          href='/'
          className='text-2xl font-serif font-semibold text-gray-900 leading-tight dark:text-gray-100 mb-5 ml-2'
        >
          <span className=' hidden md:block'>Craft</span>
          <span className=' md:hidden'>C</span>
        </Link>

        <Link
          href='/'
          className='flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        >
          <span className='text-gray-500 dark:text-gray-400 mr-3'>{<HomeIcon size={20} />}</span>
          <span className='hidden md:inline'>Dashboard</span>
        </Link>

        <Link
          href='/'
          className='flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        >
          <span className='text-gray-500 dark:text-gray-400 mr-3'>{<PlusIcon size={20} />}</span>
          <span className='hidden md:inline'>New Issue</span>
        </Link>

        <div className='mt-auto'>
          <div className='h-px bg-gray-200 dark:bg-gray-700 my-4 w-full' />

          <Link
            id='signout'
            href='/'
            className='flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700  dark:text-gray-300'
          >
            <span className='text-gray-500 dark:text-gray-400 mr-3'>
              <UserIcon size={20} />
            </span>
            <span className='hidden md:inline'>abc@gmail.com</span>
          </Link>

          <SignOutButton />
        </div>
      </div>

      <div className='flex flex-col w-full h-screen bg-white px-4 py-8 dark:bg-[#131313]'>
        <div className='flex justify-between mb-10'>
          <h3 className=' text-2xl font-semibold pt-2 px-3'>Issues</h3>
          <Link href={'/issues/new'}>
            <button className=' text-black text-sm px-4 py-2 rounded-md hover:bg-theme-coffee-hover bg-theme-coffee dark:bg-amber-900 dark:hover:bg-amber-950'>
              <span className='flex items-center dark:text-white'>
                <PlusIcon size={18} className='mr-2' />
                New Issue
              </span>
            </button>
          </Link>
        </div>

        <IssueList />
      </div>
    </div>
  );
}
