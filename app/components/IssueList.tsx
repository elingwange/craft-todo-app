'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import { Status, Priority } from '@/lib/types';
import { ISSUE_STATUS, ISSUE_PRIORITY, Issue } from '@/db/schema';
import { formatRelativeTime } from '@/lib/utils';

export default function IssueList() {
  const [issues, setIssues] = useState<Issue[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/issues');
      const data = await res.json();
      setIssues(data);
    }

    fetchData();
  }, []);

  if (!issues) return <div className='p-6 text-gray-500'>Loading...</div>;

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high shadow-sm'>
      <div className='grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-elevated border-b border-gray-200 dark:border-dark-border-default'>
        <div className='col-span-5'>Title</div>
        <div className='col-span-2'>Status</div>
        <div className='col-span-2'>Priority</div>
        <div className='col-span-3'>Created</div>
      </div>

      {issues.length > 0 ? (
        <div className='divide-y divide-gray-200 dark:divide-dark-border-default'>
          {issues.map((issue) => (
            <Link
              key={issue.id}
              href={`/issues/${issue.id}`}
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
      ) : (
        <div className='px-6 py-8 text-center text-gray-500 dark:text-gray-400'>
          No issues found.
        </div>
      )}
    </div>
  );
}
