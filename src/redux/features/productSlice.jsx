import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    // 🔄 FETCH PRODUCTS
    fetchStart: (state) => {
      state.loading = true;
    },

    fetchSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },

    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ➕ ADD PRODUCT (ADMIN)
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },

    // ❌ DELETE PRODUCT (ADMIN)
    deleteProduct: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;