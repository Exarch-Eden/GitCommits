import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { File } from "../../types";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";

export interface FileChanges {
  sha: string;
  current: string;
  fileList: File[];
  patch: string;
}

export interface PayloadCurrentFile {
  current: string;
  sha: string;
}

export interface PayloadFileList {
  fileList: File[];
  sha: string;
}

export interface PayloadPatch {
  patch: string;
  sha: string;
}

export interface FileChangesState {
  expandedCommits: FileChanges[]
}

const initialState: FileChangesState = {
  expandedCommits: []
  // current: "",
  // fileList: [],
  // patch: "",
};

export const fileChangesSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    addExpandedCommit: (state, action: PayloadAction<FileChanges>) => {
      state.expandedCommits = [...state.expandedCommits, action.payload]
    },
    setCurrentFile: (state, action: PayloadAction<PayloadCurrentFile>) => {
      // const index = state.expandedCommits.findIndex(fileChanges => fileChanges.sha === action.payload.sha);
      const index = getIndex(state.expandedCommits, action.payload.sha);
      state.expandedCommits[index].current = action.payload.current;
    },
    setFileList: (state, action: PayloadAction<PayloadFileList>) => {
      const index = getIndex(state.expandedCommits, action.payload.sha);
      state.expandedCommits[index].fileList = action.payload.fileList;
    },
    setPatch: (state, action: PayloadAction<PayloadPatch>) => {
      const index = getIndex(state.expandedCommits, action.payload.sha);
      state.expandedCommits[index].patch = action.payload.patch;
    },
  },
});

const getIndex = (commitsArray: FileChanges[], sha: string) => {
  return commitsArray.findIndex(fileChanges => fileChanges.sha === sha)
}

export const { addExpandedCommit, setCurrentFile, setFileList, setPatch } =
  fileChangesSlice.actions;

export const selectExpandedCommits = (state: RootState) => state.file.expandedCommits;

// export const selectCurrentFile = (sha: string) => {
//   const commitsArray = useAppSelector(selectExpandedCommits);
//   return commitsArray[getIndex(commitsArray, sha)].current;
// }
// export const selectFileList = (sha: string) => {
//   const commitsArray = useAppSelector(selectExpandedCommits);
//   return commitsArray[getIndex(commitsArray, sha)].fileList;
// }
// export const selectPatch = (sha: string) => {
//   const commitsArray = useAppSelector(selectExpandedCommits);
//   return commitsArray[getIndex(commitsArray, sha)].patch;
// }

export const selectCurrentFile = (state: RootState, sha: string) => {
  const commitsArray = state.file.expandedCommits;
  const index = getIndex(commitsArray, sha);
  if (index < 0) {
    return "";
  }

  return commitsArray[index].current;
}

export const selectFileList = (state: RootState, sha: string) => {
  const commitsArray = state.file.expandedCommits;
  const index = getIndex(commitsArray, sha);
  if (index < 0) {
    return [];
  }

  return commitsArray[index].fileList;
}

export const selectPatch = (state: RootState, sha: string) => {
  const commitsArray = state.file.expandedCommits;
  const index = getIndex(commitsArray, sha);
  if (index < 0) {
    return "";
  }

  return commitsArray[index].patch;
}

// export const selectCurrentFile = (state: RootState, sha: string) => state.file.expandedCommits[getIndex(state.file.expandedCommits, sha)].current || "";
// export const selectFileList = (state: RootState, sha: string) => state.file.expandedCommits[getIndex(state.file.expandedCommits, sha)].fileList || [];
// export const selectPatch = (state: RootState, sha: string) => state.file.expandedCommits[getIndex(state.file.expandedCommits, sha)].patch || "";

export default fileChangesSlice.reducer;
