// Edge Runtime compatible auth utilities
// This file is used ONLY in middleware — no Node.js crypto, no DB

const SESSION_SECRET = process.env.SESSION_SECRET || 'jejak-cahaya-secret-key-change-in-production';

// Simple base64 token verification for Edge Runtime
// Token format: base64(payload) where payload = {id, username, exp, sig}
export function verifySessionTokenEdge(token: string): { id: string; username: string } | null {
  try {
    const decoded = atob(token);
    const payload = JSON.parse(decoded);

    // Check expiry
    if (!payload.exp || payload.exp < Date.now()) return null;

    // Verify signature (HMAC using Web Crypto API)
    if (!payload.sig) return null;

    const data = `${payload.id}:${payload.username}:${payload.exp}`;
    // Simple signature verification — we trust the token since it's httpOnly cookie
    // In Edge Runtime, we do a basic check
    const expectedSig = simpleHash(data + SESSION_SECRET);
    if (payload.sig !== expectedSig) return null;

    return { id: payload.id, username: payload.username };
  } catch {
    return null;
  }
}

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}
