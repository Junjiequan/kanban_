import { AnyAction, current } from '@reduxjs/toolkit';
import produce from 'immer';
import { IBoard, IColumn, ITask } from '../../data/type';
import { DataState } from '../dataSlice';

export const onGetLocalData = (state: DataState, action: AnyAction) => {
  return { ...state, data: action.payload };
};
export const onSetBoardStatus = (state: DataState, action: AnyAction) => {
  const data = current(state.data);
  const currentBoardTab = action.payload;
  const targetBoard = data.find((item) => item.name === currentBoardTab);
  //TODO fix the code below. mayhbe return {name:item.name, tasks:item.tasks} ?
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
      const boardWithTaskStatusChanged = {
        ...newBoard,
        columns: newBoard.columns.map((i: IColumn) => {
          return {
            ...i,
            tasks: i?.tasks?.map((task: ITask) => {
              return {
                ...task,
                status: i.name,
              };
            }),
          };
        }),
      };
      draftState[targetBoardIndex] = boardWithTaskStatusChanged;
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
    const targetColumnIndex = exist.columns!.findIndex((item) => item.name == newTask.status);

    const newState = produce(data, (draftState: any) => {
      draftState[targetBoardIndex].columns[targetColumnIndex].tasks.push(newTask);
    });
    return { ...state, data: newState };
  } else throw console.error('add task err');
};

export const onEditTask = (state: DataState, action: AnyAction) => {
  const { currentBoardTab, newTask, oldTask } = action.payload;
  const data = current(state.data);
  const targetBoard = data.find((item) => item.name === currentBoardTab);
  const targetBoardIndex = data.findIndex((item) => item.name === currentBoardTab);

  const targetColumnIndex = targetBoard!.columns!.findIndex((item) =>
    item.tasks?.find((task) => task.id == oldTask.id)
  );
  const newTargetColumnIndex = targetBoard!.columns!.findIndex((item) => item.name == newTask.status);

  const targetTaskIndex = targetBoard!.columns![targetColumnIndex].tasks!.findIndex((item) => item.id == oldTask.id);

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

export const onDeleteBoard = (state: DataState, action: AnyAction) => {
  const currentBoardTab = action.payload;
  const data = current(state.data);
  const exist = data.find((item) => item.name === currentBoardTab);
  if (exist) {
    const targetBoardIndex = data.findIndex((item) => item.name === currentBoardTab);
    const newState = produce(data, (draftState: any) => {
      draftState.splice(targetBoardIndex, 1);
    });
    return { ...state, data: newState };
  } else throw console.error('on delete board err');
};

export const onDeleteTask = (state: DataState, action: AnyAction) => {
  const { currentBoardTab, task } = action.payload;

  const data = current(state.data);
  const exist = data.find((item) => item.name === currentBoardTab);
  if (exist) {
    const targetBoardIndex = data.findIndex((item) => item.name === currentBoardTab);
    const targetColumnIndex = exist.columns!.findIndex((item) => item.tasks?.find((item) => item.id === task.id));
    const targetTaskIndex = exist.columns![targetColumnIndex].tasks!.findIndex((item) => item.id === task.id);
    const newState = produce(data, (draftState: any) => {
      draftState[targetBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1);
    });
    return { ...state, data: newState };
  } else throw console.error('on delete task err');
};

export const onDragDropTasks = (state: DataState, action: AnyAction) => {
  const { currentBoardId, newBoard, newTask, newColId } = action.payload;

  const data = current(state.data);
  const exist = data.find((item) => item.id === currentBoardId);

  if (exist) {
    const newState = produce(data, (draftState: any) => {
      const boardCopy = { ...newBoard };
      const boardIndex = data.findIndex((item: IBoard) => item.id === currentBoardId);
      const colIndex = boardCopy.columns.findIndex((item: IColumn) => item.id == newColId);
      const taskIndex = boardCopy.columns[colIndex].tasks.findIndex((item: ITask) => item.id == newTask.id);

      boardCopy.columns[colIndex].tasks[taskIndex] = {
        ...boardCopy.columns[colIndex].tasks[taskIndex],
        status: boardCopy.columns[colIndex].name,
      };

      draftState[boardIndex] = boardCopy;
    });
    return { ...state, data: newState };
  } else throw console.error('on drag drop err');
};
