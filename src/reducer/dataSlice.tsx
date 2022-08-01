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
    addBoard: (state) => state,
    addTask: (state) => state,
    addColumn: (state) => state,
    editBoard: (state) => state,
    deleteBoard: (state) => state,
    deleteTask: (state) => state,
  },
});

export const { getLocalData, addBoard } = dataSlice.actions;

export default dataSlice.reducer;
