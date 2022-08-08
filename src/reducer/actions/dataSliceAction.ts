import { current } from '@reduxjs/toolkit';
import produce from 'immer';
import { IBoard, IColumn } from '../../data/type';

export const onAddTask = (state: IBoard, action: any) => {
  const { board, newTask } = action;
  const data = current(state);
  const exist = data.find((item: IBoard) => item.name === board);

  if (exist) {
    const targetBoardIndex = data.findIndex((item: IBoard) => item.name === board);
    const targetColumnIndex = exist.columns.findIndex(
      (item: IColumn) => item.name!.toLowerCase() === action.newTask.status.toLowerCase()
    );

    const newState = produce(data, (draftState: any) => {
      draftState[targetBoardIndex].columns[targetColumnIndex].tasks.push(newTask);
    });
    return newState;
  }
};
