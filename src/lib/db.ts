import { PrismaClient } from '@prisma/client'

// Ensure Neon PostgreSQL is used — system env may have stale SQLite URL
const NEON_URL = 'postgresql://neondb_owner:npg_orNaGX6I0uvV@ep-noisy-dew-ao6kchi7-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
if (!process.env.DATABASE_URL?.startsWith('postgresql://')) {
  process.env.DATABASE_URL = NEON_URL
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db