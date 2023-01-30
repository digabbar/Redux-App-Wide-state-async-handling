import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalQuantity: 0,
  isChanged: false,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    replaceCart: (state, action) => {
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action) {
      state.isChanged = true;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.isChanged = true;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
