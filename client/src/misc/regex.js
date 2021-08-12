/** Regex for extracting the GitHub username from the link input. */
export const USER_NAME_REGEX = /(?<=https:\/\/github\.com\/)(.*)(?=\/)/;

/** Regex for extracting the GitHub repo name from the link input. */
export const REPO_NAME_REGEX = /[^\/]+$/;