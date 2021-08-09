import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CommitDataState {
  value: any;
}

const initialState: CommitDataState = {
  value: {},
};

export const commitDataSlice = createSlice({
  name: "commits",
  initialState,
  reducers: {
    setCommitData: (state, action: any) => {
      state.value = action.payload;
    },
  },
});

export const { setCommitData } = commitDataSlice.actions;

export const selectCommitData = (state: RootState) => state.commits.value;

export default commitDataSlice.reducer;
