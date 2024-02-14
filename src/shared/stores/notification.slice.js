export const createNotificationSlice = (set) => ({
  isNotificationActive: false,
  showNotification: () => set((state) => ({ isNotificationActive: true })),
  hideNotification: () => set((state) => ({ isNotificationActive: false })),
  notificationContent: '',
  updateNotificationContent: (notificationContent) => set(() => ({ notificationContent })),
  notificationCancelHandler: () => {},
  bindNotificationCancelHandler: (notificationCancelHandler) => set(() => ({ notificationCancelHandler })),
});