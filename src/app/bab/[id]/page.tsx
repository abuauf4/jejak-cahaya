import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  events,
  journeys,
  getCharactersByEvent,
  getLocationById,
  getActiveCollection,
  getJourneysByCollection,
  getEventsByJourney,
} from '@/data/content';
import StoryContent from '@/components/jejak/StoryContent';
import BabPageShell from './BabPageShell';

const BASE_URL = 'https://jejakcahaya.my.id';

interface BabPageProps {
  params: Promise<{ id: string }>;
}

// Build rich meta description with long-tail keywords natural (sirah, sejarah Islam, dst.)
// Hindari keyword stuffing — pakai bahasa natural yang informative.
function buildDescription(event: typeof events[number]): string {
  const parts: string[] = [];
  if (event.subtitle) parts.push(event.subtitle);
  parts.push(event.description);
  // Long-tail keyword natural di akhir kalimat
  parts.push('Sirah nabawiyah lengkap dengan referensi.');
  return parts.join(' ');
}

// OG article tags — keywords yang relevan per bab (long-tail + broad)
function buildArticleTags(event: typeof events[number]): string[] {
  const tags = new Set<string>([
    'Sirah Nabawiyah',
    'Nabi Muhammad ﷺ',
    'Sejarah Islam',
    'Kisah Nabi',
  ]);
  // Tambah tag berdasarkan fase
  const journey = journeys.find((j) => j.id === event.journeyId);
  if (journey) {
    tags.add(journey.title);
    tags.add(`Fase ${journey.id.replace('fase-', '')}`);
  }
  // Tambah tag dari lokasi
  const location = getLocationById(event.locationId);
  if (location) tags.add(location.name);
  // Tambah tag dari tokoh
  event.characterIds.forEach((id) => {
    const char = getCharactersByEvent(event.id).find((c) => c.id === id);
    if (char) tags.add(char.name);
  });
  return Array.from(tags).slice(0, 10); // max 10 tags
}

export async function generateMetadata({ params }: BabPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((e) => e.id === `bab-${id}`);

  if (!event) {
    return {
      title: 'Bab tidak ditemukan — Jejak Cahaya',
      description: 'Halaman bab tidak ditemukan. Jelajahi sirah nabawiyah lengkap di Jejak Cahaya.',
      robots: { index: false, follow: false },
    };
  }

  // Prefer hero illustration as OG image
  const ogImage = event.image || `/api/og/bab/${id}`;
  const canonicalUrl = `${BASE_URL}/bab/${id}`;
  const description = buildDescription(event);
  const articleTags = buildArticleTags(event);

  // Find fase for breadcrumb context
  const journey = journeys.find((j) => j.id === event.journeyId);
  const babNum = event.id.replace('bab-', '');

  return {
    title: `${event.title} — Jejak Cahaya`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${event.title} — Jejak Cahaya`,
      description,
      type: 'article',
      url: canonicalUrl,
      siteName: 'Jejak Cahaya',
      locale: 'id_ID',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Ilustrasi Bab ${babNum}: ${event.title}`,
        },
      ],
      // Article-specific OG tags
      publishedTime: event.year ? `${event.yearNum}-01-01T00:00:00Z` : undefined,
      authors: ['Jejak Cahaya'],
      section: journey?.title || 'Sirah Nabawiyah',
      tags: articleTags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} — Jejak Cahaya`,
      description,
      images: [
        {
          url: ogImage,
          alt: `Ilustrasi Bab ${babNum}: ${event.title}`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return events.map((event) => ({
    id: event.id.replace('bab-', ''),
  }));
}

export default async function BabPage({ params }: BabPageProps) {
  const { id } = await params;

  const event = events.find((e) => e.id === `bab-${id}`);
  if (!event) notFound();

  // Pre-compute ALL data on the server — no client-side fetching needed
  const characters = getCharactersByEvent(event.id);
  const location = getLocationById(event.locationId);

  const activeCollection = getActiveCollection();
  const allJourneys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = allJourneys.flatMap((j) => getEventsByJourney(j.id));
  const currentIndex = allEvents.findIndex((e) => e.id === event.id);
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent =
    currentIndex >= 0 && currentIndex < allEvents.length - 1
      ? allEvents[currentIndex + 1]
      : null;

  // Find journey (fase) for breadcrumb
  const journey = journeys.find((j) => j.id === event.journeyId);
  const babNum = event.id.replace('bab-', '');
  const canonicalUrl = `${BASE_URL}/bab/${id}`;
  const articleTags = buildArticleTags(event);

  // ── JSON-LD: Article schema ──
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': canonicalUrl,
    headline: event.title,
    alternativeHeadline: event.subtitle || undefined,
    description: buildDescription(event),
    image: event.image
      ? [`${BASE_URL}${event.image}`]
      : [`${BASE_URL}/api/og/bab/${id}`],
    datePublished: event.year ? `${event.yearNum}-01-01T00:00:00Z` : undefined,
    dateModified: new Date().toISOString(),
    inLanguage: 'id-ID',
    author: {
      '@type': 'Organization',
      name: 'Jejak Cahaya',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jejak Cahaya',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: journey?.title || 'Sirah Nabawiyah',
    keywords: articleTags.join(', '),
    about: {
      '@type': 'Thing',
      name: 'Sirah Nabawiyah',
    },
    isPartOf: {
      '@type': 'Collection',
      name: 'Perjalanan Rasulullah ﷺ',
      url: BASE_URL,
    },
  };

  // ── JSON-LD: BreadcrumbList schema ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: BASE_URL,
      },
      ...(journey
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: journey.title,
              item: `${BASE_URL}/fase/${journey.id.replace('fase-', '')}`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: `Bab ${babNum}: ${event.title}`,
              item: canonicalUrl,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 2,
              name: `Bab ${babNum}: ${event.title}`,
              item: canonicalUrl,
            },
          ]),
    ],
  };

  return (
    <BabPageShell eventId={event.id}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <StoryContent
        event={event}
        characters={characters}
        location={location}
        prevEvent={prevEvent}
        nextEvent={nextEvent}
      />
    </BabPageShell>
  );
}
