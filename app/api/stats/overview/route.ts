import { NextResponse } from 'next/server';
import { getIssues } from '../../../../lib/dal';
import { IssuesOverviewResponse } from '@/types/stats';

export async function GET(): Promise<NextResponse<IssuesOverviewResponse>> {
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

  const data: IssuesOverviewResponse = {
    overview: {
      total: 0,
      completed: 0,
      completionRate: 0,
    },
    distribution: [
      { status: 'backlog', count: 0 },
      { status: 'todo', count: 0 },
      { status: 'in_progress', count: 0 },
      { status: 'done', count: 0 },
    ],
  };
  const allIssues = await getIssues();
  data.overview.total = allIssues.length;
  allIssues.map((issue) => {
    if (issue.status === 'backlog') {
      data.distribution[0].count++;
    } else if (issue.status === 'todo') {
      data.distribution[1].count++;
    } else if (issue.status === 'in_progress') {
      data.distribution[2].count++;
    } else if (issue.status === 'done') {
      data.overview.completed++;
      data.distribution[3].count++;
    }
  });
  const rate = data.overview.completed / data.overview.total;
  data.overview.completionRate = (rate * 100).toFixed(1) + '%';

  return NextResponse.json(data);
}
