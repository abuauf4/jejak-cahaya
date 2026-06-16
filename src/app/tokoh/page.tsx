'use client';

import AppShell from '@/components/jejak/AppShell';
import CharacterEncyclopedia from '@/components/jejak/CharacterEncyclopedia';
import { useNavigation } from '@/lib/store';
import { useEffect } from 'react';

export default function TokohPage() {
  const { navigateTo } = useNavigation();

  useEffect(() => {
    navigateTo('character');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell>
      <CharacterEncyclopedia />
    </AppShell>
  );
}
