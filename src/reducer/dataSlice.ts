import {
  // createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { onAddTask, onEditTask, onGetLocalData, onSetBoardtStatus } from './actions/dataSliceAction';
import type { IBoard } from '../data/type';

export interface DataState {
  data: IBoard[];
  currentBoardStatus: string[] | any;
}

const initialState: DataState = {
  data: [],
  currentBoardStatus: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    //example: (state, action) => return {...state, action.payload}
    getLocalData: (state, action) => onGetLocalData(state, action),
    setBoardtStatus: (state, action) => onSetBoardtStatus(state, action),
    addBoard: (state) => state,
    addTask: (state, action) => onAddTask(state, action),
    addColumn: (state) => state,
    editTask: (state, action) => onEditTask(state, action),
    editBoard: (state) => state,
    deleteBoard: (state) => state,
    deleteTask: (state) => state,
  },
});

export const { getLocalData, setBoardtStatus, addBoard, addTask, editTask } = dataSlice.actions;

export default dataSlice.reducer;
