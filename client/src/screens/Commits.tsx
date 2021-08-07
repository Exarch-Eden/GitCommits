import React, { useCallback, useState } from "react";
import LinkField from "../components/LinkField";

// username regex
const userNameRegex = /(?<=https:\/\/github\.com\/)(.*)(?=\/)/;

// repo name regex
const repoNameRegex = /[^\/]+$/;

/**
 * Screen component responsible for visualizing GitHub
 * repository commits.
 */
const Commits = () => {
  // // TODO: implement linkInput state to the redux store
  // const [linkInput, setLinkInput] = useState("");

  /**
   * Function called when the user presses the Enter key after
   * inputting a GitHub link. Validates existence and public visiblity
   * of the GitHub repository.
   */
  const inputOnEnterKeyDown = useCallback(
    async (linkInput: string) => {
      console.log("linkInput: ", linkInput);
    },
    []
  );

  return (
    <div>
      <LinkField onEnterKeyDown={inputOnEnterKeyDown} />
    </div>
  );
};

/**
 * Fetches commit data of a specific
 *
 * @param searchInput
 */
const fetchCommitData = async (searchInput: string) => {};

export default Commits;
