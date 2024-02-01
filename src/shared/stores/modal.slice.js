export const createModalSlice = (set) => ({
  isModalActive: false,
  modalContent: '',
  updateModalContent: (modalContent) => set(() => ({ 'modalContent': modalContent })),
  showModal: () => set((state) => ({ isModalActive: true })),
  hideModal: () => set((state) => ({ isModalActive: false })),
  okHandler: () => {},
  updateOKHandler: (okHandler) => set(() => ({ 'okHandler': okHandler })),
  cancelHandler: () => {},
  updateCancelHandler: (cancelHandler) => set(() => ({ 'cancelHandler': cancelHandler })),
});