import {
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { type LocalData, type DataState } from '../data/type';

const initialState: DataState = {
  data: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getLocalData: (state, action: PayloadAction<LocalData>) => {
      return { ...state, data: action.payload };
    },
    getData: (state) => state,
  },
});

export const { getData, getLocalData } = dataSlice.actions;

export default dataSlice.reducer;
