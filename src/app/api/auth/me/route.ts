import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('jejak-admin-session')?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, admin: session });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
