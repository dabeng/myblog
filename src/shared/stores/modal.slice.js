export const createModalSlice = (set) => ({
  isModalActive: false,
  showModal: () => set((state) => ({ isModalActive: true })),
  hideModal: () => set((state) => ({ isModalActive: false })),
  modalContent: '',
  updateModalContent: (modalContent) => set(() => ({ 'modalContent': modalContent })),
  okHandler: () => {},
  bindOKHandler: (okHandler) => set(() => ({ 'okHandler': okHandler })),
  cancelHandler: () => {},
  bindCancelHandler: (cancelHandler) => set(() => ({ 'cancelHandler': cancelHandler })),
});