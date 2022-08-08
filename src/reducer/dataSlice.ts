import {
  // createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { onAddTask, onGetLocalData } from './actions/dataSliceAction';
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
    getLocalData: onGetLocalData,
    addBoard: (state) => state,
    addTask: onAddTask,
    addColumn: (state) => state,
    editBoard: (state) => state,
    deleteBoard: (state) => state,
    deleteTask: (state) => state,
  },
});

export const { getLocalData, addBoard, addTask } = dataSlice.actions;

export default dataSlice.reducer;
