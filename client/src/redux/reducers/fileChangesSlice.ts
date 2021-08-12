import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { File } from "../../types";
import { RootState } from "../store";

export interface FileChangesState {
  current: string;
  fileList: File[];
}

const initialState: FileChangesState = {
  current: "",
  fileList: [],
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
  },
});

export const { setCurrentFile, setFileList } = fileChangesSlice.actions;

export const selectCurrentFile = (state: RootState) => state.file.current;
export const selectFileList = (state: RootState) => state.file.fileList;

export default fileChangesSlice.reducer;
