'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function IssuesTrendChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>();
  useEffect(() => {
    fetch('/api/stats/trend')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.7} />
            <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray='3 3' />
        <XAxis dataKey='name' tick={{ fontSize: 13 }} />
        <YAxis interval={0} width={30} tick={{ fontSize: 12 }} /> <Tooltip />
        <Area
          type='monotone'
          dataKey='value'
          stroke='#3b82f6'
          fill='url(#colorValue)'
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
