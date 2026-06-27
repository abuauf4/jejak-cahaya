import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { journeys, getEventsByJourney } from '@/data/content';
import FasePageShell from './FasePageShell';
import JourneyFeed from '@/components/jejak/JourneyFeed';

const BASE_URL = 'https://jejakcahaya.my.id';

interface FasePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: FasePageProps): Promise<Metadata> {
  const { id } = await params;
  const journeyId = id === 'penutup' ? 'penutup' : `fase-${id}`;
  const journey = journeys.find((j) => j.id === journeyId);

  if (!journey) {
    return {
      title: 'Fase tidak ditemukan — Jejak Cahaya',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${BASE_URL}/fase/${id}`;
  const description = `${journey.subtitle}. ${journey.description} Koleksi sirah nabawiyah dengan ${journey.eventIds.length} bab.`;

  return {
    title: journey.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${journey.title} — Jejak Cahaya`,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Jejak Cahaya',
      locale: 'id_ID',
      images: [
        {
          url: '/images/og-home.png',
          width: 1536,
          height: 1024,
          alt: `Fase: ${journey.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${journey.title} — Jejak Cahaya`,
      description,
      images: ['/images/og-home.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return journeys.map((journey) => ({
    id: journey.id === 'penutup' ? 'penutup' : journey.id.replace('fase-', ''),
  }));
}

export default async function FasePage({ params }: FasePageProps) {
  const { id } = await params;

  const journeyId = id === 'penutup' ? 'penutup' : `fase-${id}`;
  const journey = journeys.find((j) => j.id === journeyId);
  if (!journey) notFound();

  const canonicalUrl = `${BASE_URL}/fase/${id}`;
  const faseEvents = getEventsByJourney(journey.id);

  // ── JSON-LD: CollectionPage + ItemList (babs dalam fase ini) ──
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': canonicalUrl,
    name: journey.title,
    description: journey.description,
    inLanguage: 'id-ID',
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Jejak Cahaya',
      url: BASE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      name: `Bab dalam ${journey.title}`,
      numberOfItems: faseEvents.length,
      itemListElement: faseEvents.map((event, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: event.title,
        url: `${BASE_URL}/bab/${event.id.replace('bab-', '')}`,
      })),
    },
  };

  // ── JSON-LD: BreadcrumbList ──
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
      {
        '@type': 'ListItem',
        position: 2,
        name: journey.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <FasePageShell journeyId={journey.id}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <JourneyFeed standalone highlightJourneyId={journey.id} />
    </FasePageShell>
  );
}
