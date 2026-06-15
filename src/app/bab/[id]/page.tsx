import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { events } from '@/data/content';
import BabPageClient from './BabPageClient';

interface BabPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BabPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((e) => e.id === `bab-${id}`);

  if (!event) {
    return { title: 'Bab tidak ditemukan — Jejak Cahaya' };
  }

  return {
    title: `${event.title} — Jejak Cahaya`,
    description: event.subtitle
      ? `${event.subtitle}. ${event.description}`
      : event.description,
    openGraph: {
      title: `${event.title} — Jejak Cahaya`,
      description: event.subtitle || event.description,
      type: 'article',
      siteName: 'Jejak Cahaya',
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

  return <BabPageClient eventId={event.id} />;
}
