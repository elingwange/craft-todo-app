'use server';

import { z } from 'zod';
import { mockDelay } from '@/lib/utils';
import { ActionResponse } from './auth';
import { db } from '@/db';
import { issues } from '@/db/schema';
import { revalidateTag } from 'next/cache';

const IssueSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),

  description: z.string().optional().nullable(),

  status: z.enum(['backlog', 'todo', 'in_progress', 'done'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),

  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a valid priority' }),
  }),
  userId: z.string().min(1, 'User ID is required'),
});

export type IssueData = z.infer<typeof IssueSchema>;

export async function createIssue(data: IssueData): Promise<ActionResponse> {
  try {
    // Security check - ensure user is authenticated
    await mockDelay(700);
    // const user = await getCurrentUser();
    // if (!user) {
    //   return {
    //     success: false,
    //     message: 'Unauthorized access',
    //     error: 'Unauthorized',
    //   };
    // }

    // Validate with Zod
    const validationResult = IssueSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Create issue with validated data
    const validatedData = validationResult.data;
    await db.insert(issues).values({
      title: validatedData.title,
      description: validatedData.description || null,
      status: validatedData.status,
      priority: validatedData.priority,
      userId: validatedData.userId,
    });

    revalidateTag('issues');

    return { success: true, message: 'Issue created successfully' };
  } catch (error) {
    console.error('Error creating issue:', error);
    return {
      success: false,
      message: 'An error occurred while creating the issue',
      error: 'Failed to create issue',
    };
  }
}
