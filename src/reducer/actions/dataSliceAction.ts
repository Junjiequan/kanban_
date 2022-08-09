import { AnyAction, current } from '@reduxjs/toolkit';
import produce from 'immer';
import { DataState } from '../dataSlice';

export const onGetLocalData = (state: DataState, action: AnyAction) => {
  return { ...state, data: action.payload };
};

export const onAddTask = (state: DataState, action: AnyAction) => {
  const { currentBoard, newTask } = action.payload;
  const data = current(state.data);
  const exist = data.find((item) => item.name === currentBoard);

  if (exist) {
    const targetBoardIndex = data.findIndex((item) => item.name === currentBoard);
    const targetColumnIndex = exist.columns!.findIndex(
      (item) => item.name!.toLowerCase() === newTask.status.toLowerCase()
    );

    const newState = produce(data, (draftState: any) => {
      draftState[targetBoardIndex].columns[targetColumnIndex].tasks.push(newTask);
    });
    return { ...state, data: newState };
  }
};

export const onEditTask = (state: DataState, action: AnyAction) => {
  const { currentBoard, newTask, oldTask } = action.payload;
  const data = current(state.data);
  const exist = data.find((item) => item.name === currentBoard);

  if (exist) {
    const targetBoardIndex = data.findIndex((item) => item.name === currentBoard);
    const targetColumnIndex = exist.columns!.findIndex(
      (item) => item.name!.toLowerCase() === newTask.status.toLowerCase()
    );
    const targetTaskIndex = exist.columns![targetColumnIndex].tasks!.findIndex(
      (item) => item.title?.toLocaleLowerCase() === oldTask.title.toLocaleLowerCase()
    );

    const newState = produce(data, (draftState: any) => {
      draftState[targetBoardIndex].columns[targetColumnIndex].tasks[targetTaskIndex] = newTask;
    });

    return { ...state, data: newState };
  }
};
