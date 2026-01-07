import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.id === item.id
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
          totalPrice: item.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += item.price;
      }
    },

    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((i) => i.id !== id);
      }
    },

    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (!item) return;

      if (type === "increase") {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantity++;
      }

      if (type === "decrease" && item.quantity > 1) {
        item.quantity--;
        item.totalPrice -= item.price;
        state.totalQuantity--;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
