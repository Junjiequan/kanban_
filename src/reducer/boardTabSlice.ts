import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IBoard } from '../data/type';

const initialState = '';

export const boardTabSlice = createSlice({
  name: 'boardTab',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string | undefined>) => {
      return action.payload;
    },
  },
});

export const { setTab } = boardTabSlice.actions;

export default boardTabSlice.reducer;
