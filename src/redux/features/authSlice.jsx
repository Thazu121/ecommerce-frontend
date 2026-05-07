import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔐 LOGIN START
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // ✅ LOGIN SUCCESS
    loginSuccess: (state, action) => {
      state.loading = false;

      // 👇 IMPORTANT: expects { user, token }
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
      localStorage.setItem("token", action.payload.token);
    },

    // ❌ LOGIN FAIL
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🧾 SIGNUP START
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // ✅ SIGNUP SUCCESS
    signupSuccess: (state, action) => {
      state.loading = false;

      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
      localStorage.setItem("token", action.payload.token);
    },

    // ❌ SIGNUP FAIL
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🚪 LOGOUT
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;