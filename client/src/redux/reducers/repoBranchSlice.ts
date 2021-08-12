import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BranchList } from "../../types";
import { RootState } from "../store";

export interface RepoBranchState {
  value: string;
  branchList: BranchList;
  default: string;
}

const initialState: RepoBranchState = {
  value: "",
  branchList: [],
  default: "",
};

export const repoBranchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setBranch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setBranchList: (state, action: PayloadAction<BranchList>) => {
      state.branchList = action.payload;
    },
    setDefaultBranch: (state, action: PayloadAction<string>) => {
      state.default = action.payload;
    },
  },
});

export const { setBranch, setBranchList, setDefaultBranch } = repoBranchSlice.actions;

export const selectCurrentBranch = (state: RootState) => state.branch.value;
export const selectBranchList = (state: RootState) => state.branch.branchList;
export const selectDefaultBranch = (state: RootState) => state.branch.default;

export default repoBranchSlice.reducer;
