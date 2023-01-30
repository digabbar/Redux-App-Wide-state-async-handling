import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    notification: {},
  },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    req: (state, action) => {
      state.notification = {
        status: "pending",
        title: "Pending",
        message: "requesting",
      };
    },
    success: (state, action) => {
      state.notification = {
        status: "success",
        title: "Successfull",
        message: "request send successfully",
      };
    },
    error: (state, action) => {
      state.notification = {
        status: "error",
        title: "Failure",
        message: "request failed",
      };
    },
    reset: (state, action) => {
      state.notification = {};
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
