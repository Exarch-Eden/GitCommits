import React, { FC } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectPatch } from "../redux/reducers/fileChangesSlice";

import "../styles/FileContent.css";

interface FileContentProps {}

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

const FileContent: FC<FileContentProps> = () => {
  const patch = useAppSelector(selectPatch);

  return (
    <div className="fileContentContainer">
      {patch ? patch : <p>This file is empty.</p>}
    </div>
  );
};

export default FileContent;
