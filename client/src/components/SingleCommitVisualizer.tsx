import React, { FC, ReactElement, useState } from "react";
import { CommitInfo } from "../types";

// material UI imports
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import "../styles/SingleCommitVisualizer.css";
import { useAppSelector } from "../redux/hooks";
import { selectLinkInput } from "../redux/reducers/linkInputSlice";
import { fetchSingleCommitData, parseLink } from "../misc/helpers";

export interface CommitInfoProps {
  commitInfo: CommitInfo;
}

/**
 * Individual containers holding the visualized information of each
 * commit.
 *
 * @param commitInfo The commit info to visualize.
 * @returns
 */
const SingleCommitVisualizer: FC<CommitInfoProps> = ({ commitInfo }) => {
  const [expanded, setExpanded] = useState(false);

  // Used to retrieve the GitHub username and repo name
  const linkInput = useAppSelector(selectLinkInput);

  /**
   * Function called when the expand arrow icon is pressed.
   * Fetches data of the current commit and expands the container
   * to display the changed files from this commit.
   */
  const onExpandChange = async () => {
    setExpanded(!expanded);
    console.log("sha: ", commitInfo.sha);

    try {
      // sha is a required query parameter for the target endpoint
      if (!commitInfo.sha) {
        throw new Error("Commit sha not found.");
      }

      const parsedLink = parseLink(linkInput);

      const fetchedSingleCommitData = await fetchSingleCommitData(
        parsedLink.userName,
        parsedLink.repoName,
        commitInfo.sha
      );

      console.log("fetchedSingleCommitData: ");
      console.log(fetchedSingleCommitData);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="singleCommitVisualizerContainer">
      <div>
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
        {commitInfo.message ? renderCommitMessage(commitInfo.message) : null}
      </div>
      <div className="expandArrowContainer" onClick={onExpandChange}>
        {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
    <ul className="commitMessageContainer">
      {splitMessages.map((curLine: string, index: number) => {
        return <li key={index}>{curLine}</li>;
      })}
    </ul>
  );
};

export default SingleCommitVisualizer;
