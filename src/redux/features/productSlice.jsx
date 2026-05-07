import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    // 🔄 FETCH START
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // ✅ FETCH SUCCESS
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },

    // ❌ FETCH FAILURE
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ➕ ADD PRODUCT
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },

    // ✏️ UPDATE PRODUCT
    updateProduct: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    // ❌ DELETE PRODUCT
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
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;