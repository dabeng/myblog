// Create your store, which includes both state and (optionally) actions
export const createModalSlice = (set) => ({
  isModalActive: false,
  showModal: () => set((state) => ({ isModalActive: true })),
  hideModal: () => set((state) => ({ isModalActive: false })),
  modalContent: '',
  updateModalContent: (modalContent) => set(() => ({ modalContent })),
  modalOKHandler: () => {},
  bindModalOKHandler: (modalOKHandler) => set(() => ({ modalOKHandler })),
  modalCancelHandler: () => {},
  bindModalCancelHandler: (modalCancelHandler) => set(() => ({ modalCancelHandler })),
});