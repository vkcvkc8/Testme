import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './slices/expenseSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;