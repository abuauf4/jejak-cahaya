'use client';

import AppShell from '@/components/jejak/AppShell';
import SearchSystem from '@/components/jejak/SearchSystem';
import { useNavigation } from '@/lib/store';
import { useEffect } from 'react';

export default function CariPage() {
  const { navigateTo } = useNavigation();

  useEffect(() => {
    navigateTo('search');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell>
      <SearchSystem />
    </AppShell>
  );
}
