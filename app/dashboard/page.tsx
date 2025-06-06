import Link from 'next/link';
import { HomeIcon, PlusIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Badge from '../components/ui/Badge';
import { Status, Priority } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { issues } from '@/mocks/issues';

export const ISSUE_STATUS = {
  backlog: { label: 'Backlog', value: 'backlog' },
  todo: { label: 'Todo', value: 'todo' },
  in_progress: { label: 'In Progress', value: 'in_progress' },
  done: { label: 'Done', value: 'done' },
};

export const ISSUE_PRIORITY = {
  low: { label: 'Low', value: 'low' },
  medium: { label: 'Medium', value: 'medium' },
  high: { label: 'High', value: 'high' },
};

export default function DashboardPage() {
  return (
    <div className='flex w-full h-screen'>
      <div className='flex flex-col w-96 h-screen bg-slate-50 px-6 py-4'>
        <h1 className='text-2xl font-serif font-semibold text-gray-900 leading-tight dark:text-gray-100 mb-5'>
          Craft
        </h1>

        <Link
          href='/'
          className='flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        >
          <span className='text-gray-500 dark:text-gray-400 mr-3'>{<HomeIcon size={20} />}</span>
          <span className=''>Dashboard</span>
        </Link>

        <Link
          href='/'
          className='flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        >
          <span className='text-gray-500 dark:text-gray-400 mr-3'>{<PlusIcon size={20} />}</span>
          <span className=''>New Issue</span>
        </Link>

        {/* Signout 按钮放在底部 */}
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
            <span>abc@gmail.com</span>
          </Link>
          <Link
            id='signout'
            href='/'
            className='flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          >
            <span className='text-gray-500 dark:text-gray-400 mr-3'>
              <LogOutIcon size={20} />
            </span>
            <span>Sign out</span>
          </Link>
        </div>
      </div>
      <div className='flex flex-col w-full h-screen bg-white px-4 py-8'>
        <div className='flex justify-between mb-10'>
          <h3 className=' text-2xl font-semibold pt-2 px-3'>Issues</h3>
          <button className=' text-black text-sm px-5 rounded-md bg-theme-coffee dark:bg-amber-900'>
            <span className='flex items-center'>
              <PlusIcon size={18} className='mr-2' />
              New Issue
            </span>
          </button>
        </div>

        <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high shadow-sm'>
          {/* Header row */}
          <div className='grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-elevated border-b border-gray-200 dark:border-dark-border-default'>
            <div className='col-span-5'>Title</div>
            <div className='col-span-2'>Status</div>
            <div className='col-span-2'>Priority</div>
            <div className='col-span-3'>Created</div>
          </div>

          {/* Issue rows */}
          <div className='divide-y divide-gray-200 dark:divide-dark-border-default'>
            {issues.map((issue) => (
              <Link
                key={issue.id}
                href='/'
                className='block hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors'
              >
                <div className='grid grid-cols-12 gap-4 px-6 py-4 items-center'>
                  <div className='col-span-5 font-medium truncate'>{issue.title}</div>
                  <div className='col-span-2'>
                    <Badge status={issue.status as Status}>
                      {ISSUE_STATUS[issue.status as Status].label}
                    </Badge>
                  </div>
                  <div className='col-span-2'>
                    <Badge priority={issue.priority as Priority}>
                      {ISSUE_PRIORITY[issue.priority as Priority].label}
                    </Badge>
                  </div>
                  <div className='col-span-3 text-sm text-gray-500 dark:text-gray-400'>
                    {formatRelativeTime(new Date(issue.createdAt))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
