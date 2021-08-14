import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommitArray } from "../../types";
import { RootState } from "../store";

export interface CommitDataState {
  commits: CommitArray;
}

const initialState: CommitDataState = {
  commits: [],
};

export const commitDataSlice = createSlice({
  name: "commits",
  initialState,
  reducers: {
    setCommitData: (state, action: PayloadAction<CommitArray>) => {
      state.commits = action.payload;
    },
  },
});

export const { setCommitData } = commitDataSlice.actions;

export const selectCommitData = (state: RootState) => state.commits.commits;

export default commitDataSlice.reducer;
