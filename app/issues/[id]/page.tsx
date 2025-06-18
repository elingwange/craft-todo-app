import Link from 'next/link';
import { ArrowLeft, Edit2Icon, Trash2Icon } from 'lucide-react';
import { notFound } from 'next/navigation';
import Badge from '@/app/components/ui/Badge';

import { Status, Priority } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { getIssue } from '@/lib/dal';

export default async function IssuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const issue = await getIssue(parseInt(id));

  if (!issue) {
    notFound();
  }
  const { title, description, status, priority, createdAt, updatedAt, user } = issue;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'backlog':
        return 'Backlog';
      case 'todo':
        return 'Todo';
      case 'in_progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Low';
      case 'medium':
        return 'Medium';
      case 'high':
        return 'High';
      default:
        return priority;
    }
  };

  return (
    <main className='flex flex-col w-full h-screen dark:bg-dark-base p-5'>
      <button className='flex'>
        <ArrowLeft size={16} className=' mt-1 mr-2' />
        <span className='dark:text-gray-400 dark:hover:text-gray-300'>Back to Issues</span>
      </button>
      <span className='text-3xl md:text-3xl font-semibold text-gray-900 leading-tight dark:text-gray-200 py-4'>
        {issue.title}
      </span>

      <section className='flex items-center space-x-2'>
        <Link href={`/issues`}>
          <button className='border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border-medium dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100 h-8 px-3 text-xs rounded-md'>
            <span className='flex items-center'>
              <Edit2Icon size={16} className='mr-1' />
              Edit
            </span>
          </button>
        </Link>

        <Link href={`/issues`}>
          <button className='border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border-medium dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100 h-8 px-3 text-xs rounded-md'>
            <span className='flex items-center'>
              <Trash2Icon size={16} className='mr-1' />
              Delete
            </span>
          </button>
        </Link>
      </section>

      <div className='bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6 my-8'>
        <div className='flex flex-wrap gap-3 mb-6'>
          <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
          <Badge priority={priority as Priority}>{getPriorityLabel(priority)}</Badge>

          {updatedAt !== createdAt && (
            <div className='text-sm text-gray-500'>
              Updated {formatRelativeTime(new Date(updatedAt))}
            </div>
          )}
        </div>

        {description ? (
          <div className='prose dark:prose-invert max-w-none'>
            <p className='whitespace-pre-line'>{description}</p>
          </div>
        ) : (
          <p className='text-gray-500 italic'>No description provided.</p>
        )}
      </div>

      <div className='bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6 space-y-3'>
        <p className='text-xl'>Details</p>
        <section className='space-y-1'>
          <div className='text-sm text-gray-500'>Assigned to</div>
          <p>{issue.user?.email}</p>
        </section>
        <section className='space-y-1'>
          <div className='text-sm text-gray-500'>Status</div>
          <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
        </section>
        <section className='space-y-1'>
          <div className='text-sm text-gray-500'>Priority</div>
          <Badge priority={priority as Priority}>{getPriorityLabel(priority)}</Badge>
        </section>
        <section className='space-y-1'>
          <div className='text-sm text-gray-500'>Created</div>
          <p>Updated {formatRelativeTime(new Date(updatedAt))}</p>
        </section>
      </div>
    </main>
  );
}
