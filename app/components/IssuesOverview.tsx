'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
} from 'recharts';
import GradientAreaChart from './GradientAreaChart';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

export default function IssuesOverview() {
  const [data, setData] = useState<{ status: string; count: number }[]>([]);

  useEffect(() => {
    fetch('/api/stats/issues')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className='w-full h-full px-4 flex flex-col '>
      <h2 className='text-xl md:text-2xl pt-7 mb-1'>Issues Overview</h2>

      <section className='w-full flex flex-col mt-5 space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:max-w-5xl md:mx-auto'>
        {['Total Tasks', 'Completed Tasks', 'Completion Rate'].map((label, i) => (
          <section
            key={i}
            className='w-full max-w-md mx-auto pr-5 pl-7 sm:h-20 md:h-28 bg-slate-50 dark:bg-[#1A1A1A] shadow-md rounded-md flex items-start justify-between p-4 md:pt-7'
          >
            <div className='text-2xl md:text-3xl'>{i === 2 ? '83%' : '22'}</div>
            <div className='text-lg md:text-xl'>{label}</div>
          </section>
        ))}
      </section>

      <div className=' flex flex-col w-full h-72 md:h-96 mt-5 bg-slate-50 rounded-lg shadow-md py-3'>
        <h3 className='text-lg md:text-xl px-2'>Task Completion Trend</h3>
        <GradientAreaChart />
      </div>

      <ResponsiveContainer width='100%' height='25%'>
        <PieChart>
          <Pie
            data={data}
            dataKey='count'
            nameKey='status'
            cx='50%'
            cy='45%'
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
