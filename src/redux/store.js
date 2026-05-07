import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import orderReducer from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
  },
});