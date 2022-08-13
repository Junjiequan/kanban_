import { AnyAction, current } from '@reduxjs/toolkit';
import produce from 'immer';
import { DataState } from '../dataSlice';

export const onGetLocalData = (state: DataState, action: AnyAction) => {
  return { ...state, data: action.payload };
};
export const onSetBoardtStatus = (state: DataState, action: AnyAction) => {
  const data = current(state.data);
  const currentBoardName = action.payload;
  const targetBoard = data.find((item) => item.name === currentBoardName);
  const targetBoardStatusArr = targetBoard!.columns!.map((item) => item.name);
  return { ...state, currentBoardStatus: targetBoardStatusArr };
};

export const onAddBoard = (state: DataState, action: AnyAction) => {
  const newBoard = action.payload;

  const data = current(state.data);

  const newState = produce(data, (draftState: any) => {
    draftState.push(newBoard);
  });
  return { ...state, data: newState };
};

export const onEditBoard = (state: DataState, action: AnyAction) => {
  const { currentBoardTab, newBoard } = action.payload;

  const data = current(state.data);

  const exist = data.find((item) => item.name === currentBoardTab);
  if (exist) {
    const targetBoardIndex = data.findIndex((item) => item.name === currentBoardTab);

    const newState = produce(data, (draftState: any) => {
      draftState[targetBoardIndex] = newBoard;
    });
    return { ...state, data: newState };
  } else throw console.error('on edit board err');
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
  } else throw console.error('add task err');
};

export const onEditTask = (state: DataState, action: AnyAction) => {
  const { currentBoard, newTask, oldTask } = action.payload;

  //if a task move from one column to another, we need both oldTask and newTask's value
  //in order to remove task from previous column and add it to new column
  //if only value of a task changes, we don't really need oldTask.
  //just make sure to send same value as payload for newTask and oldTask to prevent errors.

  //###this block of code needs refactor and changes if the IDs are given. ###

  const data = current(state.data);
  const targetBoard = data.find((item) => item.name === currentBoard);
  const targetBoardIndex = data.findIndex((item) => item.name === currentBoard);

  const targetColumnIndex = targetBoard!.columns!.findIndex(
    (item) => item.name!.toLowerCase() === oldTask.status.toLowerCase()
  );
  const newTargetColumnIndex = targetBoard!.columns!.findIndex(
    (item) => item.name!.toLowerCase() === newTask.status.toLowerCase()
  );
  const targetTaskIndex = targetBoard!.columns![targetColumnIndex].tasks!.findIndex(
    (item) => item.title?.toLocaleLowerCase() === oldTask.title.toLocaleLowerCase()
  );

  const newState = produce(data, (draftState: any) => {
    if (
      newTask.status.toLocaleLowerCase() !== oldTask.status.toLocaleLowerCase() ||
      targetColumnIndex !== newTargetColumnIndex
    ) {
      draftState[targetBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1);
      draftState[targetBoardIndex].columns[newTargetColumnIndex].tasks.push(newTask);
    } else draftState[targetBoardIndex].columns[targetColumnIndex].tasks[targetTaskIndex] = newTask;
  });
  return { ...state, data: newState };
};
