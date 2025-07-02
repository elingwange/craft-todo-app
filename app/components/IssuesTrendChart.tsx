'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 30 },
  { name: 'Wed', value: 20 },
  { name: 'Thu', value: 27 },
  { name: 'Fri', value: 18 },
  { name: 'Sat', value: 23 },
  { name: 'Sun', value: 34 },
];

export default function GradientAreaChart() {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 0, left: 0 }} // ⬅️ 减小左边距
      >
        <defs>
          <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.7} />
            <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray='3 3' />
        <XAxis dataKey='name' tick={{ fontSize: 13 }} />
        <YAxis
          ticks={[0, 10, 20, 30, 40, 50]}
          interval={0}
          width={30}
          tick={{ fontSize: 12 }}
        />{' '}
        {/* ⬅️ 缩小 Y 轴宽度 */}
        <Tooltip />
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
