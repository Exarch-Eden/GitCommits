import React, { FC, ReactElement } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCommitData } from "../redux/reducers/commitDataSlice";
import { CommitArray, CommitInfo, SingleCommit } from "../types";
import SingleCommitVisualizer from "./SingleCommitVisualizer";

import "../styles/CommitVisualizer.css";

export interface CommitVisualizerProps {}

/**
 * Component responsible for visualizing the raw fetched data into
 * readable format for the user.
 *
 * @returns
 */
const CommitVisualizer: FC<CommitVisualizerProps> = () => {
  const commitData = useAppSelector(selectCommitData);

  return (
    <div className="commitVisualizerContainer">
      {/* {JSON.stringify(commitData)} */}
      {renderCommitInfo(commitData)}
    </div>
  );
};

/**
 * Renders the raw fetched data passed in into readable format.
 *
 * @param rawCommitArray Raw fetched data to format.
 * @returns Component list of each commit in readable format.
 */
const renderCommitInfo = (rawCommitArray: CommitArray): ReactElement => {
  return (
    <>
      {rawCommitArray.map((curCommit: SingleCommit, index: number) => {
        const commitInfo: CommitInfo = {
          message: curCommit.commit?.message,
          author: {
            realName: curCommit.commit?.author?.name,
            userName: curCommit.author?.login,
            avatar: curCommit.author?.avatar_url,
            profile: curCommit.author?.html_url,
          },
        };

        return (
          <div key={index}>
            <SingleCommitVisualizer commitInfo={commitInfo} />
          </div>
        );
      })}
    </>
  );
};

export default CommitVisualizer;
