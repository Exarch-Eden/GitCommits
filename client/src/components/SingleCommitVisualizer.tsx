import React, { FC, ReactElement } from "react";
import { CommitInfo } from "../types";

import "../styles/SingleCommitVisualizer.css";

export interface CommitInfoProps {
  commitInfo: CommitInfo;
}

const SingleCommitVisualizer: FC<CommitInfoProps> = ({ commitInfo }) => {
  return (
    <div className="singleCommitVisualizerContainer">
      <div className="authorContainer">
        <a href={commitInfo.author?.profile} target="_blank" rel="noreferrer">
          <img
            src={commitInfo.author?.avatar}
            alt={`${commitInfo.author?.userName} avatar`}
            className="authorAvatarImage"
          />
        </a>
        <a href={commitInfo.author?.profile} target="_blank" rel="noreferrer">
          <p>{commitInfo.author?.userName}</p>
        </a>
      </div>
      {/* <p>{moddedMessage}</p> */}
      {commitInfo.message ? renderCommitMessage(commitInfo.message) : null}
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
    <ul className="commitMessageContainer">
      {splitMessages.map((curLine: string, index: number) => {
        return <li key={index}>{curLine}</li>;
      })}
    </ul>
  );
};

export default SingleCommitVisualizer;
