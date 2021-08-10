import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface LinkInputState {
  value: string;
}

const initialState: LinkInputState = {
  value: "",
};

export const linkInputSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearInput: (state) => {
      state.value = "";
    },
  },
});

// Action types
export const { setInput, clearInput } = linkInputSlice.actions;

// Used to select the current state value
export const selectLinkInput = (state: RootState) => state.link.value;

export default linkInputSlice.reducer;
