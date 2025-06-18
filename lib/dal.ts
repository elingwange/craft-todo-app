import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { issues } from '@/db/schema';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { mockDelay } from './utils';

export async function getIssue(id: number) {
  try {
    await mockDelay(700);
    const result = await db.query.issues.findFirst({
      where: eq(issues.id, id),
      with: {
        user: true,
      },
    });
    return result;
  } catch (error) {
    console.error(`Error fetching issue ${id}:`, error);
    throw new Error('Failed to fetch issue');
  }
}

export async function getIssues() {
  'use cache';
  cacheTag('issues');
  try {
    await mockDelay(700);
    const result = await db.query.issues.findMany({
      with: {
        user: true,
      },
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    });
    return result;
  } catch (error) {
    console.error('Error fetching issues:', error);
    throw new Error('Failed to fetch issues');
  }
}
