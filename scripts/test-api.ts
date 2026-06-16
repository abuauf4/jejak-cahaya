// Direct test of feedback + auth logic without Next.js server
import { PrismaClient } from '@prisma/client'

// Force Neon URL
const NEON_URL = 'postgresql://neondb_owner:npg_orNaGX6I0uvV@ep-noisy-dew-ao6kchi7-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
if (!process.env.DATABASE_URL?.startsWith('postgresql://')) {
  process.env.DATABASE_URL = NEON_URL
}

const prisma = new PrismaClient()

async function testFeedback() {
  console.log('\n=== TEST 1: Feedback API ===')
  try {
    // Create feedback
    const fb = await prisma.feedback.create({
      data: {
        name: 'Test User',
        category: 'umum',
        message: 'Test feedback dari script',
        page: '/',
      },
    })
    console.log('✅ Feedback created:', fb.id)

    // Read back
    const all = await prisma.feedback.findMany({ orderBy: { createdAt: 'desc' }, take: 3 })
    console.log('✅ Feedbacks in DB:', all.length)
    for (const f of all) {
      console.log(`   - [${f.category}] ${f.message.substring(0, 40)}... (${f.id})`)
    }

    // Clean up test data
    await prisma.feedback.delete({ where: { id: fb.id } })
    console.log('✅ Test feedback cleaned up')
  } catch (error) {
    console.error('❌ Feedback test FAILED:', error)
  }
}

async function testAuth() {
  console.log('\n=== TEST 2: Auth API ===')
  try {
    const crypto = await import('crypto')

    // Find admin
    const admin = await prisma.admin.findUnique({ where: { username: 'Bagas' } })
    if (!admin) {
      console.error('❌ Admin "Bagas" not found in DB')
      return
    }
    console.log('✅ Admin found:', admin.username, '| name:', admin.name)

    // Test password verification
    const passwordHash = crypto.createHash('sha256').update('122333').digest('hex')
    const match = passwordHash === admin.passwordHash
    console.log('✅ Password "122333" matches:', match)

    if (!match) {
      console.log('   Expected hash:', passwordHash)
      console.log('   Actual hash:  ', admin.passwordHash)
    }

    // Test with wrong password
    const wrongHash = crypto.createHash('sha256').update('wrongpassword').digest('hex')
    const wrongMatch = wrongHash === admin.passwordHash
    console.log('✅ Wrong password rejected:', !wrongMatch)
  } catch (error) {
    console.error('❌ Auth test FAILED:', error)
  }
}

async function testConnection() {
  console.log('\n=== TEST 3: DB Connection ===')
  try {
    await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Neon PostgreSQL connection: OK')
  } catch (error) {
    console.error('❌ DB connection FAILED:', error)
  }
}

async function main() {
  await testConnection()
  await testFeedback()
  await testAuth()
  await prisma.$disconnect()
  console.log('\n=== All tests complete ===')
}

main().catch(console.error)
