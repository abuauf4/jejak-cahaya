import { db } from './db';
import crypto from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'jejak-cahaya-secret-key-change-in-production';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Simple hash for signature (same as edge-auth.ts)
function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Create a base64-encoded session token (Edge Runtime compatible)
export function createSessionToken(adminId: string, username: string): string {
  const exp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const sig = simpleHash(`${adminId}:${username}:${exp}` + SESSION_SECRET);

  const payload = JSON.stringify({
    id: adminId,
    username,
    exp,
    sig,
  });

  return Buffer.from(payload).toString('base64');
}

// Verify token (Node.js version for API routes)
export function verifySessionToken(token: string): { id: string; username: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const payload = JSON.parse(decoded);

    if (!payload.exp || payload.exp < Date.now()) return null;
    if (!payload.sig) return null;

    const data = `${payload.id}:${payload.username}:${payload.exp}`;
    const expectedSig = simpleHash(data + SESSION_SECRET);
    if (payload.sig !== expectedSig) return null;

    return { id: payload.id, username: payload.username };
  } catch {
    return null;
  }
}

export async function authenticateAdmin(username: string, password: string) {
  const admin = await db.admin.findUnique({ where: { username } });
  if (!admin) return null;
  if (!verifyPassword(password, admin.passwordHash)) return null;
  return { id: admin.id, username: admin.username, name: admin.name };
}
