import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewType =
  | "home"
  | "timeline"
  | "reader"
  | "character"
  | "location"
  | "search"
  | "collections";

interface NavigationState {
  currentView: ViewType;
  selectedEventId: string | null;
  selectedCharacterId: string | null;
  selectedLocationId: string | null;
  selectedCollectionId: string | null;
  theme: "light" | "dark";
  navigateTo: (view: ViewType, id?: string | null) => void;
  goHome: () => void;
  setSelectedCollection: (collectionId: string | null) => void;
  toggleTheme: () => void;
}

export const useNavigation = create<NavigationState>((set) => ({
  currentView: "home",
  selectedEventId: null,
  selectedCharacterId: null,
  selectedLocationId: null,
  selectedCollectionId: null,
  theme: "light",
  navigateTo: (view, id = null) => {
    set(() => {
      const update: Partial<NavigationState> = { currentView: view };
      if (view === "reader") update.selectedEventId = id;
      if (view === "character") update.selectedCharacterId = id;
      if (view === "location") update.selectedLocationId = id;
      return update;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  goHome: () => {
    set({
      currentView: "home",
      selectedEventId: null,
      selectedCharacterId: null,
      selectedLocationId: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  setSelectedCollection: (collectionId) => {
    set({ selectedCollectionId: collectionId });
  },
  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },
}));

const TOTAL_EVENTS = 17;

interface ReadingProgress {
  readEvents: string[];
  currentEventId: string | null;
  markEventRead: (eventId: string) => void;
  setCurrentEvent: (eventId: string | null) => void;
  getProgress: () => { read: number; total: number; percentage: number };
  getJourneyProgress: (journeyEventIds: string[]) => { read: number; total: number; percentage: number };
  getLastReadEventId: () => string | null;
}

export const useReadingProgress = create<ReadingProgress>()(
  persist(
    (set, get) => ({
      readEvents: [],
      currentEventId: null,
      markEventRead: (eventId: string) => {
        set((state) => {
          if (state.readEvents.includes(eventId)) return state;
          return { readEvents: [...state.readEvents, eventId] };
        });
      },
      setCurrentEvent: (eventId: string | null) => {
        set({ currentEventId: eventId });
      },
      getProgress: () => {
        const read = get().readEvents.length;
        return {
          read,
          total: TOTAL_EVENTS,
          percentage: Math.round((read / TOTAL_EVENTS) * 100),
        };
      },
      getJourneyProgress: (journeyEventIds: string[]) => {
        const readEvents = get().readEvents;
        const read = journeyEventIds.filter((id) => readEvents.includes(id)).length;
        return {
          read,
          total: journeyEventIds.length,
          percentage: journeyEventIds.length > 0 ? Math.round((read / journeyEventIds.length) * 100) : 0,
        };
      },
      getLastReadEventId: () => {
        const { readEvents, currentEventId } = get();
        return currentEventId || (readEvents.length > 0 ? readEvents[readEvents.length - 1] : null);
      },
    }),
    {
      name: "jejak-cahaya-progress",
    }
  )
);
