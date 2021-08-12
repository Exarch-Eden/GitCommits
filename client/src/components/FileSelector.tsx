import React, { FC } from "react";
import { ReactElement } from "react";
import { useCallback } from "react";

// redux imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectCurrentFile,
  selectFileList,
  setCurrentFile,
  setPatch,
} from "../redux/reducers/fileChangesSlice";

// type imports
import { File } from "../types";

import "../styles/FileSelector.css";

interface FileSelectorProps {}

const FileSelector: FC<FileSelectorProps> = () => {
  const currentFile = useAppSelector(selectCurrentFile);
  const fileList = useAppSelector(selectFileList);

  const dispatch = useAppDispatch();

  const fileOnClick = (fileName: string, filePatch: string) => {
    dispatch(setCurrentFile(fileName));
    dispatch(setPatch(filePatch));
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
