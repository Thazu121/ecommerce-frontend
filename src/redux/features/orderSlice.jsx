import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    // ➕ Add Order
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    // ❌ Remove Order
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },

    // 🗑 Clear Orders
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const {
  addOrder,
  removeOrder,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;