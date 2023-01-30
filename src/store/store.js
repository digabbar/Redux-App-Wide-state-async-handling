import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import cartReducer from "./cart-slice";
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});
