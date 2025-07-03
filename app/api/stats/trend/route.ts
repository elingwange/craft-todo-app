import { NextResponse } from 'next/server';
import { getIssues } from '../../../../lib/dal';
import { Issue } from '@/db/schema';
/*
  {
    id: 1,
    title: ' Wrong text',
    description: 'several wrong text include title, description and introduce',
    status: 'done',
    priority: 'low',
    createdAt: 2025-05-16T20:13:29.829Z,
    updatedAt: 2025-05-16T20:13:29.829Z,
    userId: 'qk_4T-5qQXXE8Xo5mblB_',
    user: {
      id: 'qk_4T-5qQXXE8Xo5mblB_',
      email: 'diana01282024@gmail.com',
      password: '$2b$10$2vgqYLMGp.qyyxlqXraEY.zvYUEseDEf670KmdtkiFTpdwis8TftC',
      createdAt: 2025-06-28T20:20:05.619Z
    }
  }
  */
export async function GET(): Promise<NextResponse> {
  const allIssues = await getIssues();

  const data = getLast7DaysCompletedCounts(allIssues);

  return NextResponse.json(data);
}

function getLast7DaysCompletedCounts(issues: Issue[]) {
  const result: { name: string; value: number }[] = [];

  // 初始化最近7天结构（从6天前到今天）
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];

    result.push({
      name,
      value: 0,
    });
  }

  // 遍历 issues，筛选最近7天并且 status 为 'done' 的任务
  for (const issue of issues) {
    if (issue.status !== 'done') continue;

    const createdAt = new Date(issue.createdAt);

    // 计算这个任务距离今天的天数
    const now = new Date();
    const diffTime = now.getTime() - createdAt.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 0 && diffDays < 7) {
      const index = 6 - diffDays; // 倒序存储（老的在前，新的一天在后）
      result[index].value += 1;
    }
  }

  return result;
}
