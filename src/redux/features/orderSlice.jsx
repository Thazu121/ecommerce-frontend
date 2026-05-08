import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    // ✅ SET ALL ORDERS (IMPORTANT FIX)
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    // ➕ Add Order
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    // ❌ Remove Order
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },

    // 🗑 Clear Orders
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const {
  setOrders,
  addOrder,
  removeOrder,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;