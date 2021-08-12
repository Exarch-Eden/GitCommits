import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { File } from "../../types";
import { RootState } from "../store";

export interface FileChangesState {
  current: string;
  fileList: File[];
  patch: string;
}

const initialState: FileChangesState = {
  current: "",
  fileList: [],
  patch: "",
};

export const fileChangesSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setCurrentFile: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    setFileList: (state, action: PayloadAction<File[]>) => {
      state.fileList = action.payload;
    },
    setPatch: (state, action: PayloadAction<string>) => {
      state.patch = action.payload;
    },
  },
});

export const { setCurrentFile, setFileList, setPatch } =
  fileChangesSlice.actions;

export const selectCurrentFile = (state: RootState) => state.file.current;
export const selectFileList = (state: RootState) => state.file.fileList;
export const selectPatch = (state: RootState) => state.file.patch;

export default fileChangesSlice.reducer;
