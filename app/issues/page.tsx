import Link from 'next/link';
import { ArrowLeft, PlusIcon } from 'lucide-react';
import IssueList from '../components/IssueList';

export default function DashboardPage() {
  return (
    <main className='flex flex-col w-full h-screen dark:bg-dark-base p-5'>
      <Link href={'/dashboard'} className='mb-4'>
        <button className='flex'>
          <ArrowLeft size={16} className=' mt-1 mr-2' />
          <span className='dark:text-gray-400 dark:hover:text-gray-300'>Back to Dashboard</span>
        </button>
      </Link>

      <div className='flex flex-col w-full h-screen p-8 '>
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
    </main>
  );
}
