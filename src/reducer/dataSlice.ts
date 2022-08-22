import {
  // createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  onAddTask,
  onEditTask,
  onEditBoard,
  onDeleteBoard,
  onDeleteTask,
  onGetLocalData,
  onSetBoardStatus,
  onDragDropTasks,
  onAddBoard,
} from './actions/dataSliceAction';
import type { IBoard } from '../data/type';

export interface DataState {
  data: IBoard[];
  currentBoardStatus: string[] | any;
  colorTheme: 'light' | 'dark';
}

const initialState: DataState = {
  data: [],
  colorTheme: 'dark',
  currentBoardStatus: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    //example: (state, action) => return {...state, action.payload}
    hydrate: (state, action) => action.payload,
    toggleTheme: (state, action) => ({ ...state, colorTheme: action.payload }),
    getLocalData: (state, action) => onGetLocalData(state, action),
    setBoardStatus: (state, action) => onSetBoardStatus(state, action),
    addBoard: (state, action) => onAddBoard(state, action),
    addTask: (state, action) => onAddTask(state, action),
    addColumn: (state) => state,
    dragDropTasks: (state, action) => onDragDropTasks(state, action),
    editTask: (state, action) => onEditTask(state, action),
    editBoard: (state, action) => onEditBoard(state, action),
    deleteBoard: (state, action) => onDeleteBoard(state, action),
    deleteTask: (state, action) => onDeleteTask(state, action),
  },
});

export const {
  hydrate,
  toggleTheme,
  getLocalData,
  setBoardStatus,
  addBoard,
  addTask,
  editBoard,
  editTask,
  deleteBoard,
  deleteTask,
  dragDropTasks,
} = dataSlice.actions;

export default dataSlice.reducer;
