import React, { FC, ReactElement, useState } from "react";
import FileSelector from "./FileSelector";

// material UI imports
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// redux imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectLinkInput } from "../redux/reducers/linkInputSlice";
import { fetchSingleCommitData, parseLink } from "../misc/helpers";

// type imports
import { CommitInfo } from "../types";

import "../styles/SingleCommitVisualizer.css";
import FileContent from "./FileContent";
import { setFileList } from "../redux/reducers/fileChangesSlice";

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

  const dispatch = useAppDispatch();

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

      dispatch(setFileList(fetchedSingleCommitData.files || []));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="singleCommitVisualizerContainer">
      <div className="minimalContainer">
        <div>
          <div className="authorContainer">
            <a
              href={commitInfo.author?.profile}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={commitInfo.author?.avatar}
                alt={`${commitInfo.author?.userName} avatar`}
                className="authorAvatarImage"
              />
            </a>
            <a
              href={commitInfo.author?.profile}
              target="_blank"
              rel="noreferrer"
            >
              <p>{commitInfo.author?.userName}</p>
            </a>
          </div>
          {commitInfo.message ? renderCommitMessage(commitInfo.message) : null}
        </div>
        <div className="expandArrowContainer" onClick={onExpandChange}>
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>
      </div>
      <div hidden={!expanded}>
        <div className="fileChangesContainer">
          {/* <p>This is the hidden div. Spooky.</p> */}
          <FileSelector />
          <FileContent />
        </div>
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
