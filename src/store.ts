import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducer/dataSlice';
import boardTabReducer from './reducer/boardTabSlice';
import modalReducer from './reducer/modalSlice';

const KEY = 'kanban-app-state';
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = async (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    console.error(e);
  }
};

export const store = configureStore({
  reducer: {
    data: dataReducer,
    boardTab: boardTabReducer,
    modal: modalReducer,
  },
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
