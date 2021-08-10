import React, { useCallback, useEffect, useState } from "react";
import CommitVisualizer from "../components/CommitVisualizer";
import LinkField from "../components/LinkField";

// redux imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectCommitData,
  setCommitData,
} from "../redux/reducers/commitDataSlice";
import { selectLinkInput } from "../redux/reducers/linkInputSlice";
import { CommitArray } from "../types";

/** Regex for extracting the GitHub username from the link input. */
const USER_NAME_REGEX = /(?<=https:\/\/github\.com\/)(.*)(?=\/)/;

/** Regex for extracting the GitHub repo name from the link input. */
const REPO_NAME_REGEX = /[^\/]+$/;

/**
 * Only used for development builds. The local server
 * endpoint URI to fetch commit data from.
 */
const LOCAL_SERVER_BASE_URL = "http://localhost:5000/commits";

/**
 * Screen component responsible for visualizing GitHub
 * repository commits.
 */
const Commits = () => {
  // the link input inserted by the user in the LinkField component
  const linkInput = useAppSelector(selectLinkInput);
  // purely for testing purposes
  const commitData = useAppSelector(selectCommitData);
  // redux store dispatch mainly used to set the commit data after fetching
  const dispatch = useAppDispatch();

  /**
   * Function called when the user presses the Enter key after
   * inputting a GitHub link. Validates existence and public visiblity
   * of the GitHub repository before executing the data fetching process.
   */
  const inputOnEnterKeyDown = useCallback(async () => {
    console.log("linkInput: ", linkInput);

    // holds the parsed user and repo name from the link input
    let parsedLink: ParsedLink = { userName: "", repoName: "" };

    try {
      // parse the link for user and repo name
      // will throw an error if it fails to find
      // a user or repo name from the link
      parsedLink = parseLink(linkInput);

      // fetch commits once parsing is successful
      const fetchedCommitData: CommitArray = await fetchCommitData(
        parsedLink.userName,
        parsedLink.repoName
      );
      
      console.log("fetched commitData:");
      console.table(fetchedCommitData);

      dispatch(setCommitData(fetchedCommitData));
      
    } catch (error) {
      console.error(error);
    }
    console.log("end of inputOnEnterKeyDown()");
  }, [linkInput, dispatch]);

  // // for testing purposes
  // // logs commitData redux state
  // useEffect(() => {
  //   console.log("redux commitData: ");
  //   console.table(commitData);
  // }, [commitData]);

  return (
    <div className="commitsScreenContainer">
      <LinkField onEnterKeyDown={inputOnEnterKeyDown} />
      <p>Commit Visualizer</p>
      <CommitVisualizer />
    </div>
  );
};

export type ParsedLink = {
  userName: string;
  repoName: string;
};

/**
 * Parses the given link for a GitHub username and repository name.
 * Will throw an error if it fails to find either one.
 *
 * @param link The GitHub repo link to validate.
 * @returns An object containing both username and repo name.
 */
const parseLink = (link: string): ParsedLink => {
  console.log("parseLink()");

  const userName = link.match(USER_NAME_REGEX);
  const repoName = link.match(REPO_NAME_REGEX);

  // throw an error if there is no match for either
  // the user or repo name
  if (!userName && !repoName) {
    // no user and repo name
    throw new Error(
      "Could not parse the given link for a username and repository name"
    );
  } else if (!userName) {
    // no username only
    throw new Error("Could not parse the given link for a username");
  } else if (!repoName) {
    // no repo name only
    throw new Error("Could not parse the given link for a repository name");
  } // end if else

  console.log("end of parseLink()");

  return {
    userName: userName[0],
    repoName: repoName[0],
  };
};

/**
 * Fetches commit data of the default branch based on the given
 * GitHub username and repo name.
 *
 * @param searchInput
 */
const fetchCommitData = async (userName: string, repoName: string): Promise<CommitArray> => {
  console.log("fetchCommitData()");

  // holds the fetched data
  let fetchedData = [];

  // console.log("parameters: ");
  // console.table({ userName, repoName });

  const targetUrl = `${LOCAL_SERVER_BASE_URL}?owner=${userName}&repo=${repoName}`;
  // console.log("targetUrl: ", targetUrl);

  try {
    // IMPORTANT: a maximum of 30 commits can be fetched per request
    // be sure to account for that later
    const fetchedRes = await fetch(targetUrl);
    const data = await fetchedRes.json();

    // console.log("fetched data:");
    // console.table(data);

    fetchedData = data;
  } catch (error) {
    throw new Error(error);
  }

  console.log("end of fetchCommitData()");

  return fetchedData;
};

export default Commits;
