import { Button } from "@material-ui/core";
import React, { useCallback } from "react";

// component imports
import BranchSelector from "../components/BranchSelector";
import CommitVisualizer from "../components/CommitVisualizer";
import LinkField from "../components/LinkField";

// redux imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCommitData } from "../redux/reducers/commitDataSlice";
import { selectLinkInput } from "../redux/reducers/linkInputSlice";
import {
  selectCurrentBranch,
  setBranch,
  setBranchList,
  setDefaultBranch,
} from "../redux/reducers/repoBranchSlice";

// type imports
import { BranchData, BranchList, CommitArray, ParsedLink } from "../types";

// local helper function imports
import { fetchBranches, fetchCommitData, parseLink } from "../misc/helpers";

import "../styles/Commits.css"

/**
 * Screen component responsible for visualizing GitHub
 * repository commits.
 */
const Commits = () => {
  // the link input inserted by the user in the LinkField component
  const linkInput = useAppSelector(selectLinkInput);
  // the currently selected branch to fetch commit data from
  const currentBranch = useAppSelector(selectCurrentBranch);
  // redux store dispatch mainly used to set the commit data after fetching
  const dispatch = useAppDispatch();

  /**
   * Function called when the user changes branches via BranchSelector component.
   * Fetches commit data from the newly selected branch.
   *
   * @param targetBranch The branch to fetch commits from.
   */
  const onBranchChange = useCallback(
    async (targetBranch: string) => {
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
          parsedLink.repoName,
          targetBranch
        );

        // console.log("fetched commitData:");
        // console.table(fetchedCommitData);

        // set the commit data
        dispatch(setCommitData(fetchedCommitData));
      } catch (error) {
        console.error(error);
      }
    },
    [linkInput, dispatch]
  );

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

      // console.log("fetched commitData:");
      // console.table(fetchedCommitData);

      // set the commit data
      dispatch(setCommitData(fetchedCommitData));

      // fetch branch data
      const fetchedBranchData: BranchData = await fetchBranches(
        parsedLink.userName,
        parsedLink.repoName
      );

      // set the branch list
      dispatch(setBranchList(fetchedBranchData.branchList));
      // set the default branch
      dispatch(setDefaultBranch(fetchedBranchData.defaultBranch));
      // set the current branch as the default
      dispatch(setBranch(fetchedBranchData.defaultBranch));
    } catch (error) {
      console.error(error);
    }
    console.log("end of inputOnEnterKeyDown()");
  }, [linkInput, dispatch]);

  return (
    <div className="commitsScreenContainer">
      <div className="inputAndButtonContainer">
        <LinkField onEnterKeyDown={inputOnEnterKeyDown} />
        <Button variant="contained" color="primary" onClick={inputOnEnterKeyDown}>
          Fetch
        </Button>
      </div>
      <BranchSelector onBranchChange={onBranchChange} />
      <p>Commit Visualizer</p>
      <CommitVisualizer />
    </div>
  );
};

export default Commits;
