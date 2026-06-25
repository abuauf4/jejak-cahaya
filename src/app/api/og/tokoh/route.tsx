// ══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — OG Image: Tokoh
// Route: /api/og/tokoh/[id]
// ══════════════════════════════════════════════════════

import { ImageResponse } from 'next/og';
import { characters } from '@/data/content';

export const runtime = 'edge';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/api/og/tokoh/')[1];

  const character = characters.find((c) => c.id === id);

  if (!character) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: 1200, height: 630, backgroundColor: '#080B16', color: '#F0EBE0', fontFamily: 'serif', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 32, color: '#8B8070' }}>Jejak Cahaya</div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: 1200,
          height: 630,
          backgroundColor: '#080B16',
          color: '#F0EBE0',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(212,168,67,0.05) 0%, transparent 50%, rgba(212,168,67,0.03) 100%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 100px',
            position: 'relative',
            zIndex: 1,
            width: '100%',
          }}
        >
          {/* Top label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 14, color: '#D4A843', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
              Ensiklopedia Tokoh
            </div>
            <div style={{ width: 24, height: 1, backgroundColor: 'rgba(212,168,67,0.3)' }} />
            <div style={{ fontSize: 14, color: '#8B8070' }}>{character.period}</div>
          </div>

          <div style={{ width: 60, height: 2, backgroundColor: '#D4A843', marginBottom: 32, borderRadius: 1 }} />

          {/* Name */}
          <div style={{ fontSize: 56, fontWeight: 700, color: '#F5D78E', lineHeight: 1.15, marginBottom: 12, maxWidth: 900 }}>
            {character.name}
          </div>

          {/* Title/role */}
          <div style={{ fontSize: 22, color: '#C4B59A', marginBottom: 40, maxWidth: 800 }}>
            {character.title}
          </div>

          {/* Short bio */}
          <div style={{ fontSize: 17, color: '#8B8070', lineHeight: 1.6, maxWidth: 750 }}>
            {character.shortBio.length > 180
              ? character.shortBio.slice(0, 180) + '...'
              : character.shortBio}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto',
              paddingTop: 32,
              borderTop: '1px solid rgba(212,168,67,0.1)',
            }}
          >
            <div style={{ fontSize: 15, color: '#C4B59A' }}>
              {character.eventIds.length} kisah dalam Sirah Nabawiyah
            </div>
            <div style={{ fontSize: 13, color: '#8B8070', letterSpacing: '0.1em' }}>
              jejakcahaya.id
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
