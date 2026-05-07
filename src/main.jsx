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

/* COMPONENTS */
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

/* PAGES */
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProductManagement from "./pages/ProductManagement.jsx";

/* ---------------- ROUTER ---------------- */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />, // Layout wrapper

    children: [
      /* HOME */
      { index: true, element: <Home /> },

      /* PRODUCT DETAILS */
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },

      /* CART */
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      /* ORDERS (FIXED ✔ IMPORTANT) */
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },

      /* PROFILE */
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      /* ADMIN */
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

  /* AUTH ROUTES */
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  /* FALLBACK */
  { path: "*", element: <Navigate to="/" replace /> },
]);

/* ---------------- RENDER APP ---------------- */
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);