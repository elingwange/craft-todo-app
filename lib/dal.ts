import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { issues, users } from '@/db/schema';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { mockDelay } from './utils';
import { cache } from 'react';

export async function getCurrentUser() {
  await mockDelay(2000);
  return 'user';
}

export const getUserByEmail = cache(async (email: string) => {
  try {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0] || null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
});

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
