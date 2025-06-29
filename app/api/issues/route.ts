import { NextResponse } from 'next/server';
import { getIssues } from '@/lib/dal';

export async function GET() {
  const allIssues = await getIssues();
  return NextResponse.json(allIssues);
}
