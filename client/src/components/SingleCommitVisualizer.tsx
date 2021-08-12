import React, { FC, ReactElement } from "react";
import { CommitInfo } from "../types";

import "../styles/SingleCommitVisualizer.css";

export interface CommitInfoProps {
  commitInfo: CommitInfo;
}

const SingleCommitVisualizer: FC<CommitInfoProps> = ({ commitInfo }) => {
  return (
    <div className="singleCommitVisualizerContainer">
      {/* <p>{moddedMessage}</p> */}
      {commitInfo.message ? renderCommitMessage(commitInfo.message) : null}
      <div>
        <p>
          Author: {commitInfo.author?.userName} ({commitInfo.author?.realName})
        </p>
      </div>
    </div>
  );
};

/**
 * Renders the commit message. Accounts for \n characters.
 *
 * @param commitMessage The commit message to render.
 * @returns The commit message organized into a list of lines.
 */
const renderCommitMessage = (commitMessage: string): ReactElement => {
  const splitMessages = commitMessage.split("\n");

  return (
    <ul>
      {splitMessages.map((curLine: string, index: number) => {
        return <li>{curLine}</li>;
      })}
    </ul>
  );
};

export default SingleCommitVisualizer;
