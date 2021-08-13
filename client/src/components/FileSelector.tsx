import React, { FC } from "react";
import { ReactElement } from "react";
import { useCallback } from "react";

// redux imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  PayloadCurrentFile,
  PayloadPatch,
  selectCurrentFile,
  selectFileList,
  setCurrentFile,
  setPatch,
} from "../redux/reducers/fileChangesSlice";

// type imports
import { File } from "../types";

import "../styles/FileSelector.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface FileSelectorProps {
  sha: string
}

const FileSelector: FC<FileSelectorProps> = ({ sha }) => {
  // const currentFile = useAppSelector(selectCurrentFile);
  // const fileList = useAppSelector(selectFileList);
  // const currentFile = useSelector((state: RootState) => selectCurrentFile(state, sha))
  // const fileList = useSelector((state: RootState) => selectFileList(state, sha))
  const currentFile = useAppSelector((state) => selectCurrentFile(state, sha))
  const fileList = useAppSelector((state) => selectFileList(state, sha))

  const dispatch = useAppDispatch();

  const fileOnClick = (fileName: string, filePatch: string) => {
    const currentFilePayload: PayloadCurrentFile = {
      current: fileName, sha
    };

    const patchPayload: PayloadPatch = { patch: filePatch, sha };

    dispatch(setCurrentFile(currentFilePayload));
    dispatch(setPatch(patchPayload));
  };

  // const renderFileList = (fileList: File[], fileOnClick: (fileName: string) => void): ReactElement => {
  const renderFileList = (fileList: File[]): ReactElement => {
    return (
      <ul className="fileList">
        {fileList.map((curFile: File, index: number) => {
          // class name assigned to the currently selected file
          const isActiveClassName =
            curFile.filename === currentFile ? "activeFile" : "";

          return (
            <li
              key={index}
              onClick={() => fileOnClick(curFile.filename!, curFile.patch!)}
              className={isActiveClassName}
            >
              {curFile.filename}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="fileSelectorContainer">
      {/* <p>This is the file selector.</p> */}
      {renderFileList(fileList)}
    </div>
  );
};

export default FileSelector;
