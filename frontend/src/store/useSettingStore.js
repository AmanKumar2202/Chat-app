import { create } from 'zustand';

export const useSettingsStore = create((set) => ({
  smartReplyEnabled: false,
  setSmartReplyEnabled: (value) => set({ smartReplyEnabled: value }),
}));
