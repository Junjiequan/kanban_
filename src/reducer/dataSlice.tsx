import {
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { IBoard } from '../data/type';

export interface DataState {
  data: IBoard[];
}

const initialState: DataState = {
  data: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getLocalData: (state, action: PayloadAction<IBoard[]>) => {
      return { ...state, data: action.payload };
    },
    getData: (state) => state,
  },
});

export const { getData, getLocalData } = dataSlice.actions;

export default dataSlice.reducer;
