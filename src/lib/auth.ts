import { db } from './db';
import crypto from 'crypto';

// ─────────────────────────────────────────────────────
// SESSION_SECRET wajib di-set di .env / environment.
// Tanpa fallback — kalau kosong, app harus crash, bukan
// jalan dengan secret yang bisa ditebak.
// ─────────────────────────────────────────────────────
const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error(
    '[jejak-cahaya] SESSION_SECRET tidak ditemukan di environment variables. ' +
    'Tambahkan SESSION_SECRET=<random-string> ke .env atau deployment config.'
  );
}

// ─────────────────────────────────────────────────────
// Password Hashing — SHA-256 + random salt per password
// ─────────────────────────────────────────────────────
const SALT_BYTES = 16;
const HASH_ITERATIONS = 100_000;

function generateSalt(): string {
  return crypto.randomBytes(SALT_BYTES).toString('hex');
}

/**
 * Hash password dengan salt + iterasi PBKDF2.
 * Format output: `salt:hash` (hex).
 */
export function hashPassword(password: string): string {
  const salt = generateSalt();
  const hash = crypto
    .pbkdf2Sync(password, salt, HASH_ITERATIONS, 64, 'sha512')
    .toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifikasi password terhadap stored hash.
 * Mendukung format baru (salt:hash) dan format lama (plain SHA-256)
 * supaya admin yang sudah ada tidak terkunci saat migrasi.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  // Format baru: salt:hash (PBKDF2)
  if (storedHash.includes(':')) {
    const [salt, hash] = storedHash.split(':');
    const computedHash = crypto
      .pbkdf2Sync(password, salt, HASH_ITERATIONS, 64, 'sha512')
      .toString('hex');
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(computedHash, 'hex')
    );
  }

  // Format lama: plain SHA-256 (backward compatibility)
  // Login berhasil → password akan di-rehash otomatis ke format baru
  const legacyHash = crypto.createHash('sha256').update(password).digest('hex');
  return legacyHash === storedHash;
}

/**
 * Cek apakah hash masih format lama (plain SHA-256).
 * Dipakai setelah login berhasil untuk rehash ke format baru.
 */
export function isLegacyHash(storedHash: string): boolean {
  return !storedHash.includes(':');
}

// ─────────────────────────────────────────────────────
// Session Token — HMAC-SHA256 signature
// ─────────────────────────────────────────────────────
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Buat session token dengan HMAC-SHA256 signature.
 * Format: base64(JSON({id, username, exp, sig}))
 * sig = HMAC-SHA256(payload, SESSION_SECRET)
 */
export function createSessionToken(adminId: string, username: string): string {
  const exp = Date.now() + TOKEN_EXPIRY_MS;
  const payloadStr = `${adminId}:${username}:${exp}`;
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET!)
    .update(payloadStr)
    .digest('hex');

  const payload = JSON.stringify({ id: adminId, username, exp, sig });
  return Buffer.from(payload).toString('base64');
}

/**
 * Verifikasi session token (Node.js — untuk API routes).
 * Menggunakan timing-safe comparison untuk cegah timing attack.
 */
export function verifySessionToken(token: string): { id: string; username: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const payload = JSON.parse(decoded);

    if (!payload.exp || payload.exp < Date.now()) return null;
    if (!payload.sig) return null;

    const data = `${payload.id}:${payload.username}:${payload.exp}`;
    const expectedSig = crypto
      .createHmac('sha256', SESSION_SECRET!)
      .update(data)
      .digest('hex');

    // Timing-safe comparison
    if (
      !crypto.timingSafeEqual(
        Buffer.from(payload.sig, 'hex'),
        Buffer.from(expectedSig, 'hex')
      )
    ) {
      return null;
    }

    return { id: payload.id, username: payload.username };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────
// Admin Authentication
// ─────────────────────────────────────────────────────
export async function authenticateAdmin(username: string, password: string) {
  const admin = await db.admin.findUnique({ where: { username } });
  if (!admin) return null;
  if (!verifyPassword(password, admin.passwordHash)) return null;

  // Jika password masih format lama, rehash ke format baru
  if (isLegacyHash(admin.passwordHash)) {
    try {
      const newHash = hashPassword(password);
      await db.admin.update({
        where: { id: admin.id },
        data: { passwordHash: newHash },
      });
    } catch {
      // Rehash gagal bukan blocker — login tetap berhasil
    }
  }

  return { id: admin.id, username: admin.username, name: admin.name };
}
