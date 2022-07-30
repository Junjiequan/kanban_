import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducer/dataSlice';
import boardTabReducer from './reducer/boardTabSlice';
import modalReducer from './reducer/modalSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    boardTab: boardTabReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
