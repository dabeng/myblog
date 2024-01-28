export const createNotificationSlice = (set) => ({
  isNotificationActive: false,
  showNotification: () => set((state) => ({ isNotificationActive: true })),
  hideNotification: () => set((state) => ({ isNotificationActive: false })),
});