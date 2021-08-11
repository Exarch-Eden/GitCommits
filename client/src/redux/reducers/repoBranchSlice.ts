import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface RepoBranchState {
  value: string;
}

const initialState: RepoBranchState = {
  value: "",
};

export const repoBranchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setBranch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setBranch } = repoBranchSlice.actions;

export const selectRepoBranch = (state: RootState) => state.branch.value;

export default repoBranchSlice.reducer;
