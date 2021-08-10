import React, { FC } from "react";
import { CommitInfo } from "../types";

import "../styles/SingleCommitVisualizer.css"

export interface CommitInfoProps {
  commitInfo: CommitInfo;
}

const SingleCommitVisualizer: FC<CommitInfoProps> = ({ commitInfo }) => {
  return (
    <div className="singleCommitVisualizerContainer">
      <p>{commitInfo.message}</p>
      <div>
        <p>
          Author: {commitInfo.author?.userName} ({commitInfo.author?.realName})
        </p>
      </div>
    </div>
  );
};

export default SingleCommitVisualizer;
