import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PATCH — Mark feedback as read/unread
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { read } = body;

    if (typeof read !== 'boolean') {
      return NextResponse.json({ error: 'Field "read" harus boolean' }, { status: 400 });
    }

    const updated = await db.feedback.update({
      where: { id },
      data: { read },
    });

    return NextResponse.json({ success: true, feedback: updated });
  } catch (error) {
    console.error('Feedback PATCH error:', error);
    return NextResponse.json({ error: 'Gagal mengupdate' }, { status: 500 });
  }
}

// DELETE — Remove feedback
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.feedback.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback DELETE error:', error);
    return NextResponse.json({ error: 'Gagal menghapus' }, { status: 500 });
  }
}
