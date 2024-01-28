export const createModalSlice = (set) => ({
  isModalActive: false,
  showModal: () => set((state) => ({ isModalActive: true })),
  hideModal: () => set((state) => ({ isModalActive: false })),
});