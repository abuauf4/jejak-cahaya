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
