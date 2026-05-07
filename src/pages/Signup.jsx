import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signupStart,
  signupSuccess,
  signupFailure,
} from "../redux/features/authSlice";

import API from "../api/api"

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // 🧠 input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ validation
  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    else if (form.name.length < 3)
      newErrors.name = "Min 3 characters";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Min 6 characters";
    else if (!/(?=.*[A-Z])/.test(form.password))
      newErrors.password = "1 uppercase required";
    else if (!/(?=.*[0-9])/.test(form.password))
      newErrors.password = "1 number required";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm password required";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🚀 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      dispatch(signupStart());

      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      dispatch(signupSuccess(res.data));

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/");
    } catch (err) {
      dispatch(
        signupFailure(
          err.response?.data?.message || "Signup failed"
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-600">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm">
            Join our shopping platform
          </p>
        </div>

        {/* API Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                errors.name
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                errors.email
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                errors.password
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                errors.confirmPassword
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Signup"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-600 font-semibold ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}