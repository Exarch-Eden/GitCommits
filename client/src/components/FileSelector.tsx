import React, { FC } from "react";
import { ReactElement } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectFileList } from "../redux/reducers/fileChangesSlice";

import { File } from "../types";

import "../styles/FileSelector.css";

interface FileSelectorProps {}

const FileSelector: FC<FileSelectorProps> = () => {
  const fileList = useAppSelector(selectFileList);

  return (
    <div className="fileSelectorContainer">
      <p>This is the file selector.</p>
      {renderFileList(fileList)}
    </div>
  );
};

const renderFileList = (fileList: File[]): ReactElement => {
  return (
    <ul className="fileList">
      {fileList.map((curFile: File, index: number) => {
        return <li key={index}>{curFile.filename}</li>;
      })}
    </ul>
  );
};

export default FileSelector;
