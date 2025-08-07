'use client';

import { IssuesOverviewResponse } from '@/types/stats';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

export default function IssuesDistributionChart({
  response,
}: {
  response?: IssuesOverviewResponse;
}) {
  const data = response?.distribution;
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie data={data} dataKey='count' nameKey='status' cx='50%' cy='45%' outerRadius={80} label>
          {data?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
