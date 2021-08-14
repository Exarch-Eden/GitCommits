import React, { FC, ReactElement } from "react";

// materialUI imports
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

// redux imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectBranchList,
  selectCurrentBranch,
  setCurrent,
} from "../redux/reducers/repoBranchSlice";

// type imports
import { BranchList, SingleBranch } from "../types";

import "../styles/BranchSelector.css";

interface BranchSelectorProps {
  onBranchChange: (targetBranch: string) => void;
}

/**
 * Component responsible for displaying the repository's branch list.
 * The user can select one of the branches within the list to fetch
 * commits from.
 *
 * @returns
 */
const BranchSelector: FC<BranchSelectorProps> = ({ onBranchChange }) => {
  const currentBranch = useAppSelector(selectCurrentBranch);
  const branchList = useAppSelector(selectBranchList);

  const dispatch = useAppDispatch();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log("handleChange(): ", event.target.value);

    const newCurrentBranch = event.target.value as string;

    dispatch(setCurrent(newCurrentBranch));

    onBranchChange(newCurrentBranch);
  };

  return (
    <div className="branchSelectorContainer">
      <p>Branch Selector</p>
      <FormControl className={classes.formControl}>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={currentBranch}
          onChange={handleChange}
        >
          {renderBranchList(branchList)}
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      {/* {renderBranchList(branchList)} */}
    </div>
  );
};

const renderBranchList = (branchList: BranchList) => {
  return branchList.map((curBranch: SingleBranch, index: number) => {
    return (
      <MenuItem value={curBranch.name} key={index}>
        {curBranch.name}
      </MenuItem>
    );
  });

  // return (
  //   <ul className="branchList">
  //     {branchList.map((curBranch: SingleBranch, index: number) => {
  //       return (
  //         <li className="singleBranchContainer" key={index}>
  //           <p>{curBranch.name}</p>
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // margin: theme.spacing(1),
      // marginLeft: theme.spacing(3),
      margin: 10,
      marginLeft: 20,
      minWidth: 120,
    },
  })
);

export default BranchSelector;
