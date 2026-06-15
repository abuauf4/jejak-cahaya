import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { journeys } from '@/data/content';
import FasePageShell from './FasePageShell';
import JourneyFeed from '@/components/jejak/JourneyFeed';

interface FasePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: FasePageProps): Promise<Metadata> {
  const { id } = await params;
  const journeyId = id === 'penutup' ? 'penutup' : `fase-${id}`;
  const journey = journeys.find((j) => j.id === journeyId);

  if (!journey) {
    return { title: 'Fase tidak ditemukan — Jejak Cahaya' };
  }

  return {
    title: `${journey.title} — Jejak Cahaya`,
    description: journey.subtitle
      ? `${journey.subtitle}. ${journey.description}`
      : journey.description,
    openGraph: {
      title: `${journey.title} — Jejak Cahaya`,
      description: journey.subtitle || journey.description,
      type: 'article',
      siteName: 'Jejak Cahaya',
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

  return (
    <FasePageShell journeyId={journey.id}>
      <JourneyFeed standalone highlightJourneyId={journey.id} />
    </FasePageShell>
  );
}
