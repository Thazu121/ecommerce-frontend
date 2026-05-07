import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import orderReducer from "./features/orderSlice";
import productReducer from "./features/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    products: productReducer,
  },
});