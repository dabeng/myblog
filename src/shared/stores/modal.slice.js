export const createModalSlice = (set) => ({
  isModalActive: false,
  modalContent: '',
  updateModalContent: (modalContent) => set(() => ({ 'modalContent': modalContent })),
  showModal: () => set((state) => ({ isModalActive: true })),
  hideModal: () => set((state) => ({ isModalActive: false })),
});