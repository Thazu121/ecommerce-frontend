import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },

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