import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    // =========================
    // ADD TO CART
    // =========================
    addToCart: (state, action) => {

      const product = action.payload;

      // SUPPORT BOTH id AND _id
      const id = product._id || product.id;

      // CHECK EXISTING ITEM
      const existing = state.items.find(
        (item) =>
          (item._id || item.id) === id
      );

      // IF EXISTS -> INCREASE QTY
      if (existing) {

        existing.quantity +=
          product.quantity || 1;

      } else {

        // NEW ITEM
        state.items.push({
          ...product,
          _id: id,
          quantity:
            product.quantity || 1,
        });
      }

      // RECALCULATE TOTALS
      cartSlice.caseReducers.calculateTotals(
        state
      );
    },

    // =========================
    // DECREASE QUANTITY
    // =========================
    decreaseQuantity: (
      state,
      action
    ) => {

      const id = action.payload;

      const item = state.items.find(
        (i) =>
          (i._id || i.id) === id
      );

      if (!item) return;

      // REDUCE QUANTITY
      if (item.quantity > 1) {

        item.quantity -= 1;

      } else {

        // REMOVE ITEM
        state.items = state.items.filter(
          (i) =>
            (i._id || i.id) !== id
        );
      }

      // RECALCULATE
      cartSlice.caseReducers.calculateTotals(
        state
      );
    },

    // =========================
    // REMOVE ITEM
    // =========================
    removeFromCart: (
      state,
      action
    ) => {

      const id = action.payload;

      state.items = state.items.filter(
        (item) =>
          (item._id || item.id) !== id
      );

      cartSlice.caseReducers.calculateTotals(
        state
      );
    },

    // =========================
    // CALCULATE TOTALS
    // =========================
    calculateTotals: (state) => {

      let totalQty = 0;
      let totalPrice = 0;

      state.items.forEach((item) => {

        totalQty += item.quantity;

        totalPrice +=
          item.price * item.quantity;
      });

      state.totalQuantity = totalQty;

      state.totalPrice = totalPrice;
    },

    // =========================
    // CLEAR CART
    // =========================
    clearCart: (state) => {

      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;