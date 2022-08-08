import { AnyAction, current } from '@reduxjs/toolkit';
import produce from 'immer';
import { IBoard, IColumn } from '../../data/type';
import { DataState } from '../dataSlice';

export const onGetLocalData = (state: DataState, action: AnyAction) => {
  return { ...state, data: action.payload };
};

export const onAddTask = (state: DataState, action: AnyAction) => {
  const { board, newTask } = action.payload;
  const data = current(state.data);

  const exist = data.find((item) => item.name === board);

  if (exist) {
    const targetBoardIndex = data.findIndex((item) => item.name === board);
    const targetColumnIndex = exist?.columns!.findIndex(
      (item) => item.name!.toLowerCase() === newTask.status.toLowerCase()
    );

    const newState = produce(data, (draftState: any) => {
      draftState[targetBoardIndex].columns[targetColumnIndex].tasks.push(newTask);
    });
    return { ...state, data: newState };
  }
};
