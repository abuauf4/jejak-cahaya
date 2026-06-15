import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewType =
  | "home"
  | "timeline"
  | "reader"
  | "character"
  | "location"
  | "search";

interface NavigationState {
  currentView: ViewType;
  selectedEventId: string | null;
  selectedCharacterId: string | null;
  selectedLocationId: string | null;
  selectedCollectionId: string | null;
  readerTheme: "light" | "dark";
  navigateTo: (view: ViewType, id?: string | null) => void;
  goHome: () => void;
  setSelectedCollection: (collectionId: string | null) => void;
  toggleReaderTheme: () => void;
}

export const useNavigation = create<NavigationState>((set) => ({
  currentView: "home",
  selectedEventId: null,
  selectedCharacterId: null,
  selectedLocationId: null,
  selectedCollectionId: null,
  readerTheme: "light",
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
  toggleReaderTheme: () => {
    set((state) => ({
      readerTheme: state.readerTheme === "light" ? "dark" : "light",
    }));
  },
}));

interface ReadingProgress {
  readEvents: string[];
  currentEventId: string | null;
  markEventRead: (eventId: string) => void;
  setCurrentEvent: (eventId: string | null) => void;
  getProgress: () => { read: number; total: number; percentage: number };
}

const TOTAL_EVENTS = 17;

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
    }),
    {
      name: "jejak-cahaya-progress",
    }
  )
);
