'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useNavigation } from '@/lib/store';
import { routes } from '@/lib/routes';

/**
 * Hook that provides URL-based navigation.
 * Uses Next.js router.push() for actual URL changes
 * and syncs with Zustand store for component state.
 */
export function useJejakNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { navigateTo, goHome } = useNavigation();

  /** Navigate to a bab (story reader) by event ID */
  const goToBab = useCallback(
    (eventId: string) => {
      navigateTo('reader', eventId);
      router.push(routes.bab(eventId));
    },
    [router, navigateTo]
  );

  /** Navigate to a fase (journey/timeline) by journey ID */
  const goToFase = useCallback(
    (journeyId: string) => {
      navigateTo('timeline');
      router.push(routes.fase(journeyId));
    },
    [router, navigateTo]
  );

  /** Navigate to a character page by character ID */
  const goToCharacter = useCallback(
    (characterId: string) => {
      navigateTo('character', characterId);
      router.push(routes.character(characterId));
    },
    [router, navigateTo]
  );

  /** Navigate to a location page by location ID */
  const goToLocation = useCallback(
    (locationId: string) => {
      navigateTo('location', locationId);
      router.push(routes.location(locationId));
    },
    [router, navigateTo]
  );

  /** Navigate to the timeline (default to fase-0) */
  const goToTimeline = useCallback(() => {
    router.push(routes.timeline);
  }, [router]);

  /** Navigate to tokoh page */
  const goToTokoh = useCallback(() => {
    router.push(routes.tokoh);
  }, [router]);

  /** Navigate to lokasi page */
  const goToLokasi = useCallback(() => {
    router.push(routes.lokasi);
  }, [router]);

  /** Navigate to cari page */
  const goToCari = useCallback(() => {
    router.push(routes.cari);
  }, [router]);

  /** Go back home */
  const goHomeNav = useCallback(() => {
    goHome();
    router.push('/');
  }, [router, goHome]);

  return {
    pathname,
    goToBab,
    goToFase,
    goToCharacter,
    goToLocation,
    goToTimeline,
    goToTokoh,
    goToLokasi,
    goToCari,
    goHome: goHomeNav,
  };
}
