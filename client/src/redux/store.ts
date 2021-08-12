import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import linkInputReducer from './reducers/linkInputSlice';
import commitDataReducer from './reducers/commitDataSlice';
import repoBranchReducer from './reducers/repoBranchSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    link: linkInputReducer,
    commits: commitDataReducer,
    branch: repoBranchReducer,
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
