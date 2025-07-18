import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { issues, users } from '@/db/schema';
import { mockDelay } from './utils';
import { cache } from 'react';
import { getSession } from './auth';

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  // Skip database query during prerendering if we don't have a session
  if (typeof window === 'undefined' && process.env.NEXT_PHASE === 'phase-production-build') {
    return null;
  }

  try {
    const result = await db.select().from(users).where(eq(users.id, session.userId));

    return result[0] || null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
});

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
  console.log('----- getIssues()');
  const user = await getCurrentUser();
  console.log('----- user.id-> ', user?.id);
  if (!user) {
    throw new Error('Failed to get user info');
  }
  try {
    const result = await db.query.issues.findMany({
      where: eq(issues.userId, user.id),
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
