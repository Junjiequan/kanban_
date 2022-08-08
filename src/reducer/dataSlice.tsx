import {
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { onAddTask } from './actions/dataSliceAction';
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
    addTask: (state: any, action: PayloadAction<string>) => {
      return { ...state, data: onAddTask(state.data, action.payload) };
    },
    addColumn: (state) => state,
    editBoard: (state) => state,
    deleteBoard: (state) => state,
    deleteTask: (state) => state,
  },
});

export const { getLocalData, addBoard, addTask } = dataSlice.actions;

export default dataSlice.reducer;
