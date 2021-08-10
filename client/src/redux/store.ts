import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import linkInputReducer from './reducers/linkInputSlice';
import commitDataReducer from './reducers/commitDataSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    link: linkInputReducer,
    commits: commitDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
