'use client';

import {
  Form,
  FormGroup,
  FormInput,
  FormLabel,
  FormTextarea,
  FormSelect,
  FormError,
} from '@/app/components/compound/Form';
import { ISSUE_STATUS, ISSUE_PRIORITY } from '@/db/schema';
import { useActionState } from 'react';
import { ActionResponse } from '@/app/actions/auth';
import { createIssue } from '@/app/actions/issues';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/basic/Button';

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
};

export default function NewIssuePage({ userId }: { userId: string }) {
  const router = useRouter();

  const statusOptions = Object.values(ISSUE_STATUS).map(({ label, value }) => ({
    label,
    value,
  }));

  const priorityOptions = Object.values(ISSUE_PRIORITY).map(({ label, value }) => ({
    label,
    value,
  }));

  const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(
    async (_, formData: FormData) => {
      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        status: formData.get('status') as 'backlog' | 'todo' | 'in_progress' | 'done',
        priority: formData.get('priority') as 'low' | 'medium' | 'high',
        userId,
      };

      try {
        const result = await createIssue(data);
        //console.log('------- result-> ', result);
        if (result.success) {
          router.refresh();
          router.push('/issues');
        }
        return result;
      } catch (err) {
        return {
          success: false,
          message: (err as Error).message || 'An error occurred',
          errors: undefined,
        };
      }
    },
    initialState
  );

  return (
    <main className='flex flex-col w-full h-screen dark:bg-dark-base p-5'>
      <Link
        href='/issues'
        className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-6'
      >
        <ArrowLeftIcon size={16} className='mr-1' />
        Back to Issues
      </Link>
      <h1 className='text-2xl md:text-2xl font-semibold text-gray-900 leading-tight dark:text-gray-200 py-6'>
        Create New Issue
      </h1>
      <section className=' dark:border-dark-border-strong border rounded-md p-6 dark:bg-dark-elevated space-y-5'>
        <Form action={formAction}>
          {state?.message && (
            <FormError
              className={`mb-4 ${
                state.success ? 'bg-green-100 text-green-800 border-green-300' : ''
              }`}
            >
              {state.message}
            </FormError>
          )}
          <FormGroup>
            <FormLabel>Title</FormLabel>
            <FormInput
              id='title'
              name='title'
              className=''
              placeholder='Issue title'
              disabled={isPending}
              required
            ></FormInput>
          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextarea
              id='description'
              name='description'
              placeholder='Describe the issue...'
              disabled={isPending}
              rows={4}
            ></FormTextarea>
          </FormGroup>
          <FormGroup>
            <FormLabel>Status</FormLabel>
            <FormSelect id='status' name='status' options={statusOptions} required></FormSelect>
          </FormGroup>
          <FormGroup>
            <FormLabel>Priority</FormLabel>
            <FormSelect
              id='priority'
              name='priority'
              options={priorityOptions}
              disabled={isPending}
              required
            ></FormSelect>
          </FormGroup>
          <FormGroup>
            <Button
              type='submit'
              disabled={isPending}
              className=' text-black text-sm px-4 py-2 rounded-md hover:bg-theme-coffee-hover bg-theme-coffee dark:bg-amber-900'
            >
              <span className='flex items-center dark:text-white'>Create Issue</span>
            </Button>
          </FormGroup>
        </Form>
      </section>
    </main>
  );
}
