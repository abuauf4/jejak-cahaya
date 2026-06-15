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
  navigateTo: (view: ViewType, id?: string | null) => void;
  goHome: () => void;
}

export const useNavigation = create<NavigationState>((set) => ({
  currentView: "home",
  selectedEventId: null,
  selectedCharacterId: null,
  selectedLocationId: null,
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
}));

interface ReadingProgress {
  readEvents: string[];
  currentEventId: string | null;
  markEventRead: (eventId: string) => void;
  setCurrentEvent: (eventId: string | null) => void;
  getProgress: () => { read: number; total: number; percentage: number };
}

const TOTAL_EVENTS = 12;

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
