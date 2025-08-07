'use client';

import { useEffect, useState } from 'react';
import IssuesDistributionChart from './IssuesDistributionChart';
import IssuesTrendChart from './IssuesTrendChart';
import { IssuesOverviewResponse } from '@/types/stats';

export default function IssuesOverview() {
  const [data, setData] = useState<IssuesOverviewResponse>();
  useEffect(() => {
    fetch('/api/stats/overview')
      .then((res) => res.json())
      .then(setData);
  }, []);
  const overviewItems = [
    { label: 'Total Tasks', value: data?.overview.total },
    { label: 'Completed Tasks', value: data?.overview.completed },
    { label: 'Completion Rate', value: data?.overview.completionRate },
  ];

  return (
    <div className='w-full h-full px-4 flex flex-col '>
      <h2 className='text-xl md:text-2xl pt-7 mb-1'>Issues Overview</h2>

      <section className='w-full flex flex-col mt-5 space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:max-w-5xl md:mx-auto'>
        {overviewItems.map((item, i) => (
          <section
            key={i}
            className='w-full max-w-md mx-auto pr-5 pl-7 sm:h-20 md:h-28 bg-slate-50 dark:bg-[#1A1A1A] shadow-md rounded-md flex items-start justify-between p-4 md:pt-7'
          >
            <div className='text-2xl md:text-3xl'>{item.value}</div>
            <div className='text-lg md:text-xl'>{item.label}</div>
          </section>
        ))}
      </section>

      <section className='w-full flex flex-col mt-5 md:flex-row md:max-w-5xl md:mx-auto'>
        <div className='md:basis-3/5 flex flex-col w-full h-72 md:h-96 bg-slate-50 dark:bg-[#1A1A1A] rounded-lg shadow-md py-3'>
          <h3 className='text-lg md:text-xl px-2'>Task Completion Trend</h3>
          <IssuesTrendChart />
        </div>

        <div className='md:basis-2/5 flex flex-col w-full h-72 md:h-96 bg-slate-50 dark:bg-[#1A1A1A] rounded-lg shadow-md py-3 ml-0 md:ml-4 mt-4 md:mt-0'>
          <h3 className='text-lg md:text-xl px-2'>Task Status Distribution</h3>
          <IssuesDistributionChart response={data} />
        </div>
      </section>
    </div>
  );
}
