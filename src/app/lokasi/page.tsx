'use client';

import AppShell from '@/components/jejak/AppShell';
import LocationExplorer from '@/components/jejak/LocationExplorer';
import { useNavigation } from '@/lib/store';
import { useEffect } from 'react';

export default function LokasiPage() {
  const { navigateTo } = useNavigation();

  useEffect(() => {
    navigateTo('location');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell>
      <LocationExplorer />
    </AppShell>
  );
}
