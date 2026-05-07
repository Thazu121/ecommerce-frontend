import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/features/authSlice";

import API from "../api/api"
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // 🧠 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔐 Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      dispatch(loginStart());

      const res = await API.post("/auth/login", form);

      dispatch(loginSuccess(res.data));

      setForm({ email: "", password: "" });

      navigate("/");
    } catch (err) {
      dispatch(
        loginFailure(
          err.response?.data?.message || "Login failed"
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* 🔷 Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-bold text-indigo-600">
            LUXE
          </h1>

          <div className="hidden md:flex gap-6 text-gray-600">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Orders</a>
          </div>

          <span
            className="md:hidden cursor-pointer text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </span>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-gray-600">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Orders</a>
          </div>
        )}
      </header>

      {/* 🧩 Main */}
      <main className="flex-grow flex items-center justify-center px-4 py-10 relative">

        {/* Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[250px] h-[250px] bg-indigo-200 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[200px] h-[200px] bg-green-200 rounded-full blur-3xl -z-10"></div>

        {/* Card */}
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md">

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">
              Login to continue shopping
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">
              {error}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-500">Email</label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
                className={`w-full mt-2 px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-400" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-200 outline-none`}
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-500">Password</label>

              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`w-full mt-2 px-4 py-3 rounded-lg border ${
                    errors.password
                      ? "border-red-400"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-indigo-200 outline-none`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Don’t have an account?
            <a href="/signup" className="text-indigo-600 ml-1">
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}