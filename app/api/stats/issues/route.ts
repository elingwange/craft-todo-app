import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { status: 'todo', count: 4 },
    { status: 'in_progress', count: 2 },
    { status: 'done', count: 5 },
  ];

  return NextResponse.json(data);
}
