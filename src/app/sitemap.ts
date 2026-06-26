// ══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — Sitemap.xml auto-generator
// Route: /sitemap.xml
//
// Includes: homepage, all 47 bab, all 10 fase, all locations, all tokoh
// Priority: home 1.0, bab 0.9, fase 0.7, lokasi/tokoh 0.6
// Change frequency: monthly (content stabilized setelah LOCKED)
// ══════════════════════════════════════════════════════

import type { MetadataRoute } from 'next';
import {
  events,
  journeys,
  locations,
  characters,
} from '@/data/content';

const BASE_URL = 'https://jejakcahaya.my.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // ── Homepage (priority 1.0, weekly refresh) ──
  entries.push({
    url: BASE_URL,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // ── Static pages ──
  entries.push({
    url: `${BASE_URL}/cari`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  });
  entries.push({
    url: `${BASE_URL}/tokoh`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  });
  entries.push({
    url: `${BASE_URL}/lokasi`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  });

  // ── Fase (10 phases — priority 0.7) ──
  journeys.forEach((journey) => {
    entries.push({
      url: `${BASE_URL}/fase/${journey.id.replace('fase-', '')}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // ── Bab (47 babs — priority 0.9, the main content) ──
  events.forEach((event) => {
    entries.push({
      url: `${BASE_URL}/bab/${event.id.replace('bab-', '')}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // ── Locations (priority 0.6) ──
  locations.forEach((location) => {
    entries.push({
      url: `${BASE_URL}/lokasi/${location.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // ── Characters (priority 0.6) ──
  characters.forEach((character) => {
    entries.push({
      url: `${BASE_URL}/tokoh/${character.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return entries;
}
