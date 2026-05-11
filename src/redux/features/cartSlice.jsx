import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(
    localStorage.getItem("cartItems")
  ) || [],

  totalQuantity: 0,

  totalPrice: 0,
};

const saveCart = (items) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(items)
  );
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    addToCart: (state, action) => {

      const product = action.payload;

      const existing =
        state.items.find(
          (item) =>
            item._id ===
            product._id
        );

      if (existing) {

        existing.quantity += 1;

      } else {

        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      state.totalQuantity =
        state.items.reduce(
          (acc, item) =>
            acc + item.quantity,
          0
        );

      state.totalPrice =
        state.items.reduce(
          (acc, item) =>
            acc +
            item.price *
              item.quantity,
          0
        );

      saveCart(state.items);
    },

    removeFromCart: (
      state,
      action
    ) => {

      state.items =
        state.items.filter(
          (item) =>
            item._id !==
            action.payload
        );

      state.totalQuantity =
        state.items.reduce(
          (acc, item) =>
            acc + item.quantity,
          0
        );

      state.totalPrice =
        state.items.reduce(
          (acc, item) =>
            acc +
            item.price *
              item.quantity,
          0
        );

      saveCart(state.items);
    },

    decreaseQuantity: (
      state,
      action
    ) => {

      const item =
        state.items.find(
          (i) =>
            i._id ===
            action.payload
        );

      if (!item) return;

      if (item.quantity > 1) {

        item.quantity -= 1;

      } else {

        state.items =
          state.items.filter(
            (i) =>
              i._id !==
              action.payload
          );
      }

      state.totalQuantity =
        state.items.reduce(
          (acc, item) =>
            acc + item.quantity,
          0
        );

      state.totalPrice =
        state.items.reduce(
          (acc, item) =>
            acc +
            item.price *
              item.quantity,
          0
        );

      saveCart(state.items);
    },

    clearCart: (state) => {

      state.items = [];

      state.totalQuantity = 0;

      state.totalPrice = 0;

      localStorage.removeItem(
        "cartItems"
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;