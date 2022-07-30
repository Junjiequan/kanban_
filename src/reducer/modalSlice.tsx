import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO optimize initialstate for modal??
const initialState = '';

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string | undefined>) => {
      return action.payload;
    },
    closeModal: (state: any, action: PayloadAction<undefined>) => {
      return undefined;
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;
