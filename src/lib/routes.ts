// ══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — URL Routing Helpers
// Maps content IDs to URL paths and back
// ══════════════════════════════════════════════════════

/**
 * Convert a content ID to a URL path
 * fase-0  → /fase/0
 * bab-1   → /bab/1
 * character IDs → /tokoh/[id]
 * location IDs  → /lokasi/[id]
 */
export function idToPath(id: string, type: 'fase' | 'bab' | 'character' | 'location'): string {
  switch (type) {
    case 'fase': {
      const num = id.replace('fase-', '').replace('penutup', 'penutup');
      return `/fase/${num}`;
    }
    case 'bab': {
      const num = id.replace('bab-', '');
      return `/bab/${num}`;
    }
    case 'character':
      return `/tokoh/${id}`;
    case 'location':
      return `/lokasi/${id}`;
  }
}

/**
 * Convert URL slug parts back to content IDs
 * /fase/0   → fase-0
 * /fase/penutup → penutup
 * /bab/1    → bab-1
 * /tokoh/muhammad-saw → muhammad-saw
 * /lokasi/makkah → makkah
 */
export function pathToId(slug: string, type: 'fase' | 'bab' | 'character' | 'location'): string {
  switch (type) {
    case 'fase':
      return slug === 'penutup' ? 'penutup' : `fase-${slug}`;
    case 'bab':
      return `bab-${slug}`;
    case 'character':
      return slug;
    case 'location':
      return slug;
  }
}

/** Quick link generators for common navigations */
export const routes = {
  home: '/',
  timeline: '/fase/0',
  tokoh: '/tokoh',
  lokasi: '/lokasi',
  cari: '/cari',
  fase: (id: string) => `/fase/${id.replace('fase-', '')}`,
  bab: (id: string) => `/bab/${id.replace('bab-', '')}`,
  character: (id: string) => `/tokoh/${id}`,
  location: (id: string) => `/lokasi/${id}`,
} as const;
