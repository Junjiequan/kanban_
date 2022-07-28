import {
  AnyAction,
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { type DataState } from '..//data/type';

const initialState: DataState = {
  data: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getLocalData: (state, action: any) => {
      return { ...state, data: action.payload };
    },
    getData: (state) => state.data,
  },
});

export const { getData, getLocalData } = dataSlice.actions;

export default dataSlice.reducer;
