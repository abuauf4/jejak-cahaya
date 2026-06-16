import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, createSessionToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const admin = await authenticateAdmin(username, password);
    if (!admin) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    const token = createSessionToken(admin.id, admin.username);

    const response = NextResponse.json(
      { success: true, admin: { username: admin.username, name: admin.name } },
      { status: 200 }
    );

    response.cookies.set('jejak-admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
