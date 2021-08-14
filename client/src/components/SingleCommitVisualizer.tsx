import React, { FC, ReactElement, useEffect, useState } from "react";
import FileSelector from "./FileSelector";

// material UI imports
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// redux imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectLinkInput,
  selectLinkValidity,
} from "../redux/reducers/linkInputSlice";
import { fetchSingleCommitData, parseLink } from "../misc/helpers";

// type imports
import { CommitInfo } from "../types";

import "../styles/SingleCommitVisualizer.css";
import FileContent from "./FileContent";
import {
  addExpandedCommit,
  clearExpandedCommits,
  FileChanges,
  PayloadFileList,
  removeExpandedCommit,
  setFileList,
} from "../redux/reducers/fileChangesSlice";

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
  // const [sha, setSha] = useState("");

  // Used to retrieve the GitHub username and repo name
  const linkInput = useAppSelector(selectLinkInput);
  const linkValidity = useAppSelector(selectLinkValidity);

  const dispatch = useAppDispatch();

  // when the user inputs a new valid GitHub link,
  // minimize all containers
  useEffect(() => {
    if (linkInput && linkValidity && expanded) {
      setExpanded(false);
      dispatch(removeExpandedCommit(commitInfo.sha!));
    }
  }, [linkInput, linkValidity, expanded, dispatch, commitInfo.sha]);

  /**
   * Function called when the expand arrow icon is pressed.
   * Fetches data of the current commit and expands the container
   * to display the changed files from this commit.
   */
  const onExpandChange = async () => {
    // the commit's unique ID
    const sha = commitInfo.sha;

    console.log("sha: ", sha);

    // sha is a required query parameter for the target endpoint
    // it is used to find the specified expanded commit within the state array
    if (!sha) {
      console.error("Commit sha not found.");
      return;
    }

    // holds the previous value of the expanded state
    // used to determine whether or not to fetch data
    const prevState = expanded;

    setExpanded(!expanded);

    // if the container has not yet been expanded, then fetch data
    // otherwise, do not fetch and instead remove the current commit's
    // file changes data from the state array
    if (!prevState) {
      try {
        // extract the user and repo name to be used for data fetching
        const parsedLink = parseLink(linkInput);

        const fetchedSingleCommitData = await fetchSingleCommitData(
          parsedLink.userName,
          parsedLink.repoName,
          sha
        );

        console.log("fetchedSingleCommitData: ");
        console.log(fetchedSingleCommitData);

        // setSha(sha);

        const newFileChanges: FileChanges = {
          sha,
          current: "",
          fileList: fetchedSingleCommitData.files || [],
          patch: "",
        };

        dispatch(addExpandedCommit(newFileChanges));
      } catch (error) {
        console.error(error);
      }
    } else {
      // remove the current commit's file changes data in the state array
      // to prevent duplicate elements within the array
      dispatch(removeExpandedCommit(sha));
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
          <FileSelector sha={commitInfo.sha!} />
          <FileContent sha={commitInfo.sha!} />
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
