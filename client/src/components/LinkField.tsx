import React, { FC, useState } from "react";
import { TextField } from "@material-ui/core";

// redux imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectLinkInput, setInput } from "../redux/reducers/linkInputSlice";

const ENTER_KEY = "Enter";

interface LinkFieldProps {
  onEnterKeyDown: () => void;
}

/**
 * Text field that accepts a link for a public GitHub repository.
 * Validates for existence visiblity of the specified repository.
 * Will not accept private repositories.
 */
const LinkField: FC<LinkFieldProps> = ({ onEnterKeyDown }) => {
  const linkInput = useAppSelector(selectLinkInput);
  const dispatch = useAppDispatch();

  return (
    <div className="linkField">
      <TextField
        value={linkInput}
        onChange={(event) => {
          const { value } = event.target;
          dispatch(setInput(value));
        }}
        onKeyDown={(event) => {
          if (event.key === ENTER_KEY) {
            onEnterKeyDown();
          }
        }}
        label="Search Input"
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};

export default LinkField;
