import { create } from "zustand";

import { Notification } from "~/types/notification";

interface NotificationsState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  removeNotification: (id) =>
    set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
  clearAll: () => set({ notifications: [] }),
}));
