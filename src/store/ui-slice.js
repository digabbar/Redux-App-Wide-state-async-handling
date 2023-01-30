import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  notification: null,
};
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.showCart = !state.showCart;
    },
    notifs: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearNotifs: (state, action) => {
      state.notification = null;
    },
  },
});
export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
