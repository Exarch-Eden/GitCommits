import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { selectPatch } from "../redux/reducers/fileChangesSlice";
import { RootState } from "../redux/store";

import "../styles/FileContent.css";

interface FileContentProps {
  sha: string
}

// Patch string example
// @@ -227,6 +227,10 @@ export const fetchCommitData = async (
//   // console.log("data: ");
//   // console.log(data);

// +    if (data.message === "Not Found") {
// +      throw new Error("Invalid link.")
// +    }
// +
//   fetchedData = data;
// } catch (error) {
//   throw new Error(error);

const FileContent: FC<FileContentProps> = ({ sha }) => {
  // const patch = useAppSelector(selectPatch);
  // const patch = useSelector((state: RootState) => selectPatch(state, sha))
  const patch = useAppSelector((state) => selectPatch(state, sha))

  return (
    <div className="fileContentContainer">
      {/* {patch ? renderPatch(patch) : <p>This file is empty.</p>} */}
      <textarea className="patchTextArea" value={patch ? patch : ""} spellCheck={false} disabled />
    </div>
  );
};

const renderPatch = (patch: string) => {
  const lines = patch.split("\n");

  return (
    <ul className="filePatchList">
      {
        lines.map((curLine: string, index: number) => {
          return (
            <li className="filePatchLine" key={index}>{curLine}</li>
          )
        })
      }
    </ul>
  )
}

export default FileContent;
