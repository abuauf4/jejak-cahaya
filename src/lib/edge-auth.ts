// Edge Runtime compatible auth utilities
// This file is used ONLY in middleware — no Node.js crypto, no DB
//
// Menggunakan Web Crypto API (HMAC-SHA256) yang tersedia di Edge Runtime.
// Signature harus konsisten dengan auth.ts (Node.js) karena
// token yang dibuat di API route harus bisa diverifikasi di middleware.

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error(
    '[jejak-cahaya] SESSION_SECRET tidak ditemukan di environment variables.'
  );
}

// Cache HMAC key agar tidak re-create setiap request
let cachedKey: CryptoKey | null = null;

async function getHmacKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  const encoder = new TextEncoder();
  cachedKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return cachedKey;
}

/**
 * Buat HMAC-SHA256 signature menggunakan Web Crypto API (Edge Runtime).
 */
async function hmacSign(data: string): Promise<string> {
  const key = await getHmacKey();
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  // Convert ArrayBuffer ke hex string
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Verifikasi session token di Edge Runtime (middleware).
 * Menggunakan HMAC-SHA256 via Web Crypto API — konsisten dengan auth.ts.
 */
export async function verifySessionTokenEdge(
  token: string
): Promise<{ id: string; username: string } | null> {
  try {
    const decoded = atob(token);
    const payload = JSON.parse(decoded);

    // Check expiry
    if (!payload.exp || payload.exp < Date.now()) return null;
    if (!payload.sig) return null;

    // Verify HMAC signature
    const data = `${payload.id}:${payload.username}:${payload.exp}`;
    const expectedSig = await hmacSign(data);

    if (payload.sig !== expectedSig) return null;

    return { id: payload.id, username: payload.username };
  } catch {
    return null;
  }
}
