import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface LinkInputState {
  link: string;
  valid: boolean;
}

const initialState: LinkInputState = {
  link: "",
  valid: false,
};

export const linkInputSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
    setInputValidity: (state, action: PayloadAction<boolean>) => {
      state.valid = action.payload;
    },
    clearInput: (state) => {
      state.link = "";
    },
  },
});

// Action types
export const { setInput, setInputValidity, clearInput } =
  linkInputSlice.actions;

// Used to select the current state value
export const selectLinkInput = (state: RootState) => state.link.link;
export const selectLinkValidity = (state: RootState) => state.link.valid;

export default linkInputSlice.reducer;
