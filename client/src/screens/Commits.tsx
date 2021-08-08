import React, { useCallback, useState } from "react";
import LinkField from "../components/LinkField";

// redux imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectLinkInput } from "../redux/reducers/linkInputSlice";

/**
 * Regex for extracting the GitHub username from the link input.
 */
const USER_NAME_REGEX = /(?<=https:\/\/github\.com\/)(.*)(?=\/)/;

/**
 * Regex for extracting the GitHub repo name from the link input.
 */
const REPO_NAME_REGEX = /[^\/]+$/;

/**
 * Screen component responsible for visualizing GitHub
 * repository commits.
 */
const Commits = () => {
  const linkInput = useAppSelector(selectLinkInput);

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
    } catch (error) {
      console.error(error);
      return;
    }

    // fetch commits once parsing is successful
    fetchCommitData(parsedLink.userName, parsedLink.repoName);
  }, [linkInput]);

  return (
    <div>
      <LinkField onEnterKeyDown={inputOnEnterKeyDown} />
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
const fetchCommitData = async (userName: string, repoName: string) => {
  console.log("fetchCommitData()");
  console.log("parameters: ");
  console.table({ userName, repoName });
  console.log("end of fetchCommitData()");
};

export default Commits;
