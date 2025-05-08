import { create } from 'zustand';

interface RefreshState {
  refreshKey: number;
  triggerRefresh: () => void;
}

export const useRefreshStore = create<RefreshState>((set) => ({
  refreshKey: 0,
  triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));