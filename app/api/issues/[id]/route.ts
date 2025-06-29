import { NextResponse } from 'next/server';
import { db } from '@/db';
import { issues } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await db.query.issues.findFirst({
    where: eq(issues.id, parseInt(params.id)),
  });

  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const body = await req.json();
  const { title, description, status, priority } = body;

  await db
    .update(issues)
    .set({
      title,
      description,
      status,
      priority,
    })
    .where(eq(issues.id, id));

  return NextResponse.json({ success: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await db.delete(issues).where(eq(issues.id, id));
  return NextResponse.json({ success: true });
}
