import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST — Submit new feedback
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, message, page } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Pesan wajib diisi' }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Pesan terlalu panjang (maks 5000 karakter)' }, { status: 400 });
    }

    const validCategories = ['umum', 'koreksi', 'referensi', 'penulisan', 'review'];
    const safeCategory = validCategories.includes(category) ? category : 'umum';

    const feedback = await db.feedback.create({
      data: {
        name: name?.trim() || null,
        category: safeCategory,
        message: message.trim(),
        page: page || null,
      },
    });

    return NextResponse.json({ success: true, id: feedback.id }, { status: 201 });
  } catch (error) {
    console.error('Feedback POST error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan masukan' }, { status: 500 });
  }
}

// GET — List all feedback (admin)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const unreadOnly = searchParams.get('unread') === 'true';

    const where: Record<string, unknown> = {};
    if (category && category !== 'semua') where.category = category;
    if (unreadOnly) where.read = false;

    const feedbacks = await db.feedback.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const total = await db.feedback.count();
    const unread = await db.feedback.count({ where: { read: false } });

    return NextResponse.json({ feedbacks, total, unread });
  } catch (error) {
    console.error('Feedback GET error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}
