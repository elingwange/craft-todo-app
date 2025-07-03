import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { issues } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: any // 👈 用 any 暂时规避类型系统的限制
) {
  const id = params.id;

  const item = await db.query.issues.findFirst({
    where: eq(issues.id, parseInt(id)),
  });

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(item);
}
