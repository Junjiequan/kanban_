import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducer/dataSlice';
import boardTabReducer from './reducer/boardTabSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    boardTab: boardTabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
