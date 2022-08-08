import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IModal, modalTypes } from '../data/type';

// TODO optimize initialstate for modal??
const initialState: IModal = {
  ModalType: '',
  ModalDetail: {},
};

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModal>) => {
      return { ...state, ...action.payload };
    },
    closeModal: (state) => {
      return {
        ...state,
        ModalType: '',
      };
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;
