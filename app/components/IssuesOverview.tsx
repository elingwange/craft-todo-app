'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

export default function IssuesOverview() {
  const [data, setData] = useState<{ status: string; count: number }[]>([]);

  useEffect(() => {
    fetch('/api/stats/issues')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className='w-full h-96 px-4 bg-slate-800'>
      <h3 className=' text-2xl font-semibold pt-2 px-3 mb-10'>Issues Overview</h3>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            dataKey='count'
            nameKey='status'
            cx='50%'
            cy='50%'
            outerRadius={100}
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
