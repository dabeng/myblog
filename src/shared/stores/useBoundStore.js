import { create } from 'zustand';
import { createModalSlice } from './modal.slice';
import { createNotificationSlice } from './notification.slice';

export const useBoundStore = create((...a) => ({
  ...createModalSlice(...a),
  ...createNotificationSlice(...a),
}))