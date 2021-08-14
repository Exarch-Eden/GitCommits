import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BranchList } from "../../types";
import { RootState } from "../store";

export interface RepoBranchState {
  current: string;
  branchList: BranchList;
  default: string;
}

const initialState: RepoBranchState = {
  current: "",
  branchList: [],
  default: "",
};

export const repoBranchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    setBranchList: (state, action: PayloadAction<BranchList>) => {
      state.branchList = action.payload;
    },
    setDefaultBranch: (state, action: PayloadAction<string>) => {
      state.default = action.payload;
    },
    clearBranches: (state) => {
      state.current = "";
      state.default = "";
      state.branchList = [];
    },
  },
});

export const { setCurrent, setBranchList, setDefaultBranch, clearBranches } =
  repoBranchSlice.actions;

export const selectCurrentBranch = (state: RootState) => state.branch.current;
export const selectBranchList = (state: RootState) => state.branch.branchList;
export const selectDefaultBranch = (state: RootState) => state.branch.default;

export default repoBranchSlice.reducer;
