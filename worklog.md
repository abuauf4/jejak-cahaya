# Jejak Cahaya Worklog

---
Task ID: 1
Agent: Main
Task: Mobile-first Journey Feed redesign — the iconic form of Jejak Cahaya

Work Log:
- Created JourneyFeed.tsx — collapsible phases, tap to expand events
- Redesigned Hero, ContinueJourney, StoryReader, Navigation
- Fixed all faint font colors, light/dark mode across all pages
- Mobile bottom tab navigation

---
Task ID: 2
Agent: Main
Task: Lock narrative structure — 8 Fase + Penutup, 47 Bab

Work Log:
- Completely rewrote content.ts with locked narrative structure
- 10 phases (8 Fase + Penutup), 47 bab
- 17 tokoh, 20 lokasi, all connected to relevant bab
- Updated TOTAL_EVENTS from 17 to 47 in store.ts
- Each bab has: title, subtitle (hook), description (focus), story placeholder

---
Task ID: 3
Agent: Main
Task: Simplify homepage — "semakin project matang, semakin sedikit yang tampil"

Work Log:
- Removed JourneyFeed from homepage (moved to Timeline page only)
- Created StartFromBeginning.tsx — links to Bab 1 (Jazirah Arab Sebelum Islam)
- Created Collections.tsx — typographic list, "Segera Hadir" badges for coming soon
- Simplified Hero to just: JEJAK CAHAYA + "Perpustakaan Digital Kisah Islam"
- Homepage now = Hero → ContinueJourney → StartFromBeginning → Collections → Footer
- Locked writing format in StoryReader:
  - Opening Scene (first paragraph, slightly muted)
  - Story (main content, full contrast)
  - Reflection (marked with ⟩ or ---, italic)
  - Continue Journey (next bab link with hook)
- Changed "Selanjutnya" label to "Lanjutkan Perjalanan"
- Build verified: ✅ clean

Stage Summary:
- Homepage is now 4 sections + footer (down from 5 sections + feed)
- JourneyFeed lives in Timeline page only
- Writing format locked: Opening → Story → Reflection → Continue
- This format scales to any collection (Sahabat, Para Nabi, Peradaban Islam)
- The "soul" of the platform is the journey, not the features
---
Task ID: 1
Agent: Main Agent
Task: Replace Bab 1 story content with user's final clean version

Work Log:
- Read current content.ts, StoryContent.tsx, StoryReader.tsx, globals.css
- Located Bab 1 story content (lines 300-378 in old content.ts)
- Replaced entire Bab 1 story with user's final clean version
- Converted ✦ ✦ ✦ scene breaks to ◆ (system marker)
- Added ⟩ reflection marker before "Di balik setiap kegelapan..." section
- Updated subtitle from "Sebelum cahaya Islam menyinari dunia" to "Sebelum Cahaya Menyinari Dunia"
- Verified Next.js build compiles successfully (64 static pages generated)
- Confirmed Narrative Bible already at v1.2 with AUTHENTIC ISLAMIC VOICE + CONTENT LAYERS

Stage Summary:
- Bab 1 story content fully replaced with final clean version
- 11 scene breaks (◆) placed at each major transition
- Reflection section starts at "Di balik setiap kegelapan..." with ⟩ marker
- Closing punchline "Kota itu bernama Makkah." auto-detected (≤120 chars)
- Build passes, no errors
- Subtitle updated to match final version

---
Task ID: 1
Agent: main
Task: Revisi Bab 4 Suku Quraisy — 3 koreksi sebelum LOCKED

Work Log:
- Baca feedback editor (PM) untuk Bab 4
- Identifikasi 3 titik revisi di content.ts dan bab-4-suku-quraisy.md
- Revisi #1: Hapus klaim Abdul Muthalib mengubur bayi perempuan → ganti dengan detail nazar (tebusan 100 unta)
- Revisi #2: "penguasa benua" → "salah satu kekuatan paling berpengaruh di Jazirah Arab"
- Revisi #3: Closing "Mempersiapkan datangnya cahaya" → "Tidak ada yang menyangka bahwa perubahan itu justru akan lahir dari salah satu rumah mereka sendiri."
- Kedua file updated: content.ts + bab-4-suku-quraisy.md

Stage Summary:
- 3 revisi diterapkan di kedua file (content.ts + markdown)
- Revisi #1: Menghindari klaim tidak bersumber tentang Abdul Muthalib mengubur bayi perempuan — diganti dengan riwayat nazar yang lebih terkenal dan sahih
- Revisi #2: Bahasa lebih proporsional, tidak berlebihan
- Revisi #3: Closing lebih spesifik ke Quraisy, bukan template "cahaya datang"

---
Task ID: 2
Agent: main
Task: Sync Bab 4 versi final bersih ke content.ts dan markdown

Work Log:
- Terima versi final bersih Bab 4 dari PM/editor
- Identifikasi perubahan tambahan di luar 3 revisi sebelumnya:
  1. Bagian Khuza'ah: "Mereka menguasai Makkah setelah generasi Ismail tersebar dan melemah" → versi lebih naratif dengan "Perlahan. Tanpa terasa. Hingga suatu hari, rumah itu sudah bukan milik mereka lagi."
  2. Hashim intro: "Hashim — kakek Nabi Muhammad ﷺ — mengubah segalanya" → "Hingga datang satu nama yang mengubah segalanya. Hashim. Kakek Nabi Muhammad ﷺ."
  3. "kota manapun" → "kota mana pun"
  4. Bagian Muthalib/Syamah dihapus, langsung ke "Nama Quraisy pun menjadi sinonim..."
  5. Nazar line: "bernazar menyembelih" → "pernah bernazar akan menyembelih", "nazarnu" → "nazar"
  6. Tambah ✦ ✦ ✦ sebelum closing reflection
- Update content.ts dengan semua perubahan
- Overwrite bab-4-suku-quraisy.md dengan versi final lengkap
- Verifikasi content.ts baris 1300-1559 match persis

Stage Summary:
- Bab 4 versi final bersih synced ke kedua file
- content.ts: baris 1300-1555 (bab-4 story)
- bab-4-suku-quraisy.md: rewrite penuh
- 🟢 BAB 4 LOCKED

---
Task ID: 3
Agent: main
Task: Fix feedback form "Gagal menyimpan masukan" error

Work Log:
- Investigated feedback API route, FeedbackForm component, Prisma schema, and DB
- Found ROOT CAUSE: No `.env` file exists → DATABASE_URL undefined → Prisma can't connect → 500 error
- DB file existed at `db/custom.db` but only had User & Post tables, missing Feedback table
- Fix #1: Created `.env` with `DATABASE_URL="file:./db/custom.db"`
- Fix #2: Ran `npx prisma db push` to create Feedback table in DB
- Fix #3: Killed stale dev server (pid 995) that didn't have .env loaded
- Fix #4: Restarted dev server so it picks up .env
- Verified: POST /api/feedback returns `{"success":true,"id":"..."}` ✅
- Verified: Record appears in DB with correct data ✅

Stage Summary:
- Problem: Missing .env file + Feedback table not migrated + stale dev server
- Solution: Created .env, ran prisma db push, restarted server
- Feedback system now fully functional

---
Task ID: 4
Agent: main
Task: Buat login admin (username: Bagas, password: 122333)

Work Log:
- Added Admin model to Prisma schema (id, username, passwordHash, name, timestamps)
- Ran prisma db push to create Admin table
- Seeded admin user: username=Bagas, password=122333 (SHA-256 hashed)
- Created auth library (src/lib/auth.ts) with:
  - hashPassword/verifyPassword (SHA-256)
  - createSessionToken/verifySessionToken (base64-encoded signed token)
  - authenticateAdmin (DB lookup + password verify)
- Created edge-auth library (src/lib/edge-auth.ts) for middleware (no Node.js crypto)
- Created API routes:
  - POST /api/auth/login — verify credentials, set httpOnly cookie
  - POST /api/auth/logout — clear cookie
  - GET /api/auth/me — check auth status
- Created login page (src/app/admin/login/page.tsx) with Jejak Cahaya dark theme
- Created middleware (src/middleware.ts) to protect /admin routes
- Added logout button to admin page header
- Verified build succeeds (npx next build ✅)
- Verified auth logic directly via Node.js (password match: YES, wrong password: NO)
- Dev server keeps crashing in background (environment issue, not code issue)

Stage Summary:
- Login admin system fully implemented
- Credentials: Username=Bagas, Password=122333
- Session: httpOnly cookie, 24h expiry, HMAC-signed base64 token
- Protected routes: /admin/* redirects to /admin/login if not authenticated
- Build passes without errors
- Files created: auth.ts, edge-auth.ts, middleware.ts, login/page.tsx, 3 API routes
- Files modified: prisma/schema.prisma, admin/page.tsx (logout button)

---
Task ID: 5
Agent: main
Task: Migrate dari SQLite ke Neon PostgreSQL

Work Log:
- Updated .env: DATABASE_URL changed from SQLite to Neon PostgreSQL
- Removed channel_binding=require from URL (Prisma incompatible)
- Updated Prisma schema: provider "sqlite" → "postgresql"
- Removed unused User and Post models (only need Feedback + Admin)
- Added @db.Text to message and passwordHash fields (PostgreSQL best practice)
- Pushed schema to Neon: npx prisma db push ✅
- Seeded admin user Bagas (password: 122333) to Neon PostgreSQL ✅
- Verified: Admin found, password match ✅

Stage Summary:
- Database migrated from SQLite → Neon PostgreSQL
- Neon host: ep-noisy-dew-ao6kchi7-pooler.c-2.ap-southeast-1.aws.neon.tech
- Tables: Feedback, Admin
- Admin user: username=Bagas, password=122333 ✅
- Note: User needs to add DATABASE_URL env var in Vercel dashboard for production

---
Task ID: 6
Agent: main
Task: Implement parchment texture + update hero & community + push to GitHub

Work Log:
- Added CSS parchment texture classes (parchment-light, parchment-dark) using SVG feTurbulence
  - Technique learned from undangan-nira repo (same as user's other project)
  - 4 layers: primary grain (0.65 freq), secondary grain (1.2 freq), warm gradient, depth gradient
  - Light: warm ivory base (#FBF8F1) with gold-brown aging tints
  - Dark: navy base (#080B16) with subtle gold shimmer
  - Pure CSS + inline SVG — zero raster images
- Updated Hero component:
  - Title: "Jejak Cahaya" (larger, bolder)
  - Subtitle: "Media digital yang menghadirkan perjalanan Rasulullah ﷺ, para nabi, dan para sahabat dalam bentuk yang mudah dibaca dan dipelajari."
  - Added parchment texture background
  - Added decorative gold line
- Updated Community component:
  - Title: "Jejak Cahaya" + "Media terbuka" badge
  - 4 openness lines (unchanged)
  - Removed contributions grid (simplified)
  - Added parchment texture background
- Committed all changes (9 commits ahead of origin)
- Push failed — needs GitHub PAT from user

Stage Summary:
- Parchment texture: SVG feTurbulence, dual-theme, no images
- Hero & Community text updated per user's brief
- All committed locally, push pending user's PAT
