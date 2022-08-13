import {
  // createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  onAddTask,
  onEditTask,
  onEditBoard,
  onGetLocalData,
  onSetBoardtStatus,
  onAddBoard,
} from './actions/dataSliceAction';
import type { IBoard } from '../data/type';

export interface DataState {
  data: IBoard[];
  currentBoardStatus: string[] | any;
  err?: any;
}

const initialState: DataState = {
  data: [],
  currentBoardStatus: [],
  err: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    //example: (state, action) => return {...state, action.payload}
    getLocalData: (state, action) => onGetLocalData(state, action),
    setBoardtStatus: (state, action) => onSetBoardtStatus(state, action),
    addBoard: (state, action) => onAddBoard(state, action),
    addTask: (state, action) => onAddTask(state, action),
    addColumn: (state) => state,
    editTask: (state, action) => onEditTask(state, action),
    editBoard: (state, action) => onEditBoard(state, action),
    deleteBoard: (state) => state,
    deleteTask: (state) => state,
  },
});

export const { getLocalData, setBoardtStatus, addBoard, addTask, editBoard, editTask } = dataSlice.actions;

export default dataSlice.reducer;
