// ══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — Dynamic OG Image Generator
// Generates share cards for each bab, tokoh, and lokasi.
//
// Visual concept:
// - Dark navy background (#080B16)
// - Gold lantern accent (#D4A843)
// - Playfair Display serif for title
// - Subtle decorative line + crescent moon
// - "Jejak Cahaya" branding bottom-right
//
// Route: /api/og/bab/[id]
// ══════════════════════════════════════════════════════

import { ImageResponse } from 'next/og';
import { events } from '@/data/content';

export const runtime = 'edge';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/api/og/bab/')[1];

  const event = events.find((e) => e.id === id || e.id === `bab-${id}`);

  if (!event) {
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
          padding: '0',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(212,168,67,0.05) 0%, transparent 50%, rgba(212,168,67,0.03) 100%)',
          }}
        />

        {/* Content container */}
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
          {/* Top: Fase label + year */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: '#D4A843',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Jejak Cahaya
            </div>
            <div style={{ width: 24, height: 1, backgroundColor: 'rgba(212,168,67,0.3)' }} />
            <div style={{ fontSize: 14, color: '#8B8070' }}>{event.year}</div>
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: 60,
              height: 2,
              backgroundColor: '#D4A843',
              marginBottom: 32,
              borderRadius: 1,
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#F5D78E',
              lineHeight: 1.15,
              marginBottom: 16,
              maxWidth: 900,
            }}
          >
            {event.title}
          </div>

          {/* Subtitle */}
          {event.subtitle && (
            <div
              style={{
                fontSize: 24,
                color: '#C4B59A',
                lineHeight: 1.4,
                marginBottom: 48,
                maxWidth: 800,
              }}
            >
              {event.subtitle}
            </div>
          )}

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
            <div style={{ fontSize: 16, color: '#8B8070', fontStyle: 'italic' }}>
              {event.description.length > 100
                ? event.description.slice(0, 100) + '...'
                : event.description}
            </div>

            {/* Branding */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div style={{ fontSize: 13, color: '#8B8070', letterSpacing: '0.1em' }}>
                jejakcahaya.id
              </div>
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
