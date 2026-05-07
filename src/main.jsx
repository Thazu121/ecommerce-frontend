import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Layout + Pages
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";

import ProductDetails from "./pages/ProductDetails.jsx";
// import ProductManagement from "./pages/ProductManagement.jsx";

// Protected Routes
import ProtectedRoute from "./components/ProtectesRoute.jsx"
import AdminRoute from "./components/AdminRoute.jsx";

// 🌐 Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,

    children: [
      // 🏠 Home
      {
        index: true,
        element: <Home />,
      },

      // 📦 Product Details
      {
        path: "product/:id",
        element: <ProductDetails />,
      },

      // 🛒 Cart
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      // 📋 Orders
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },

      // 👤 Profile
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      // 🔐 ADMIN PRODUCT PAGE
      {
        path: "admin/products",
        element: (
          <AdminRoute>
            <ProductManagement />
          </AdminRoute>
        ),
      },
    ],
  },

  // 🔑 Login
  {
    path: "/login",
    element: <Login />,
  },

  // 📝 Signup
  {
    path: "/signup",
    element: <Signup />,
  },

  // ❌ 404
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

// 🚀 Render
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);