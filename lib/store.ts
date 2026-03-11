import { create } from "zustand";

interface PortfolioStore {
  isPreloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  cursorVariant: string;
  setCursorVariant: (variant: string) => void;
  cursorLabel: string;
  setCursorLabel: (label: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  isPreloaderDone: false,
  setPreloaderDone: (done) => set({ isPreloaderDone: done }),
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
  cursorVariant: "default",
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  cursorLabel: "",
  setCursorLabel: (label) => set({ cursorLabel: label }),
}));
