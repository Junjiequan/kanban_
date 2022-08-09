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
    //example: (state, action) => return {...state, action.payload}
    getLocalData: (state, action) => onGetLocalData(state, action),
    addBoard: (state) => state,
    addTask: (state, action) => onAddTask(state, action),
    addColumn: (state) => state,
    editTask: (state, action) => state,
    editBoard: (state) => state,
    deleteBoard: (state) => state,
    deleteTask: (state) => state,
  },
});

export const { getLocalData, addBoard, addTask, editTask } = dataSlice.actions;

export default dataSlice.reducer;
