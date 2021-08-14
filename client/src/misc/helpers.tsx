// type imports
import { BranchData, CommitArray, ParsedLink, SingleCommit } from "../types";

// endpoint constant imports
import {
  BRANCHES_ENDPOINT,
  COMMITS_ENDPOINT,
  LOCAL_SERVER_BASE_URL,
  SINGLE_ENDPOINT,
} from "./endpoints";

// regex constant imports
import { REPO_NAME_REGEX, USER_NAME_REGEX } from "./regex";

/**
 * Fetches commit data of the default branch based on the given
 * GitHub username and repo name.
 *
 * @param userName The owner of the target repository.
 * @param repoName The target repository's name.
 * @param branch Optional. The branch to fetch commits from.
 * @returns The fetched commit data.
 */
export const fetchCommitData = async (
  userName: string,
  repoName: string,
  branch?: string
): Promise<CommitArray> => {
  console.log("fetchCommitData()");

  // holds the fetched data
  let fetchedData = [];

  let targetUrl = `${productionEnvCheck(
    COMMITS_ENDPOINT
  )}?owner=${userName}&repo=${repoName}`;

  if (branch) {
    targetUrl += `&branch=${branch}`;
  }

  console.log("targetUrl: ", targetUrl);

  try {
    // IMPORTANT: a maximum of 30 commits can be fetched per request
    // be sure to account for that later
    const fetchedRes = await fetch(targetUrl);
    const data = await fetchedRes.json();

    // IMPORTANT: The bottom code block should not exist in
    // the first place
    // REMOVE it as soon as the local server has proper
    // error-handling for these types of errors

    // returned object may contain an error message
    // rather than an array
    if (data.message === "Not Found") {
      // the user has input an invalid GitHub repo link
      throw new Error("Invalid link.");
    }

    fetchedData = data;
  } catch (error) {
    throw new Error(error);
  }

  console.log("end of fetchCommitData()");

  return fetchedData;
};

/**
 * Fetches the branch list and default branch of the repository
 * based on the given GitHub username and repo name.
 *
 * @param userName The owner of the target repository.
 * @param repoName The target repository's name.
 * @returns The fetched branch list.
 */
export const fetchBranches = async (
  userName: string,
  repoName: string
): Promise<BranchData> => {
  console.log("fetchBranchList()");

  // holds the fetched branch list and default branch
  // local server will return an object of this shape
  let fetchedData: BranchData = { defaultBranch: "", branchList: [] };

  const targetUrl = `${productionEnvCheck(
    BRANCHES_ENDPOINT
  )}?owner=${userName}&repo=${repoName}`;

  try {
    const fetchedRes = await fetch(targetUrl);
    fetchedData = await fetchedRes.json();
    console.log("fetched branches:");
    console.log(fetchedData);
  } catch (error) {
    throw new Error(error);
  }

  console.log("end of fetchBranchList()");

  return fetchedData;
};

/**
 * Fetches the commit data of an individual commit with the given
 * GitHub username, repo name, and commit sha.
 * 
 * @param userName The owner of the target repository.
 * @param repoName The target repository's name.
 * @param sha The target commit's sha.
 * @returns The fetched branch list.
 */
export const fetchSingleCommitData = async (
  userName: string,
  repoName: string,
  sha: string
): Promise<SingleCommit> => {
  console.log("fetchSingleCommitData()");

  const targetUrl = `${productionEnvCheck(
    SINGLE_ENDPOINT
  )}?owner=${userName}&repo=${repoName}&sha=${sha}`;

  let data: SingleCommit = {};

  try {
    const fetchedRes = await fetch(targetUrl);
    data = await fetchedRes.json();
  } catch (error) {
    throw new Error(error);
  }

  console.log("end of fetchSingleCommitData()");

  return data;
};

/**
 * Parses the given link for a GitHub username and repository name.
 * Will throw an error if it fails to find either one.
 *
 * @param link The GitHub repo link to validate and parse.
 * @returns An object containing both username and repo name.
 */
export const parseLink = (link: string): ParsedLink => {
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
 * Helper function for target URL generation when fetching data.
 * Prepends localhost to the given endpoint if node environment
 * is not in production.
 *
 * @param endpoint The local server endpoint to request to.
 * @returns The endpoint by itself if in production environment; otherwise,
 * localhost:5000 prepended to the endpoint.
 */
const productionEnvCheck = (endpoint: string): string => {
  return process.env.NODE_ENV === "production"
    ? endpoint
    : LOCAL_SERVER_BASE_URL + endpoint;
};
