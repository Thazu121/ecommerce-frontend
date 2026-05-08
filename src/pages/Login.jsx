import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/features/authSlice";

import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const validate = () => {
    let newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      dispatch(loginStart());

      const res = await API.post("/auth/login", form);

      dispatch(loginSuccess(res.data));

      setForm({ email: "", password: "" });

      console.log("LOGIN RESPONSE:", res.data); // DEBUG

    
      if (res.data.user.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/");
      }

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

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

          <h1 className="text-lg font-bold text-indigo-600">
            LUXE
          </h1>

          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Home
          </Link>

        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4">

        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md">

          <h2 className="text-2xl font-semibold text-center mb-1">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-sm text-center mb-6">
            Login to continue shopping
          </p>

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm text-gray-500">
                Email
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="w-full mt-2 px-4 py-3 border rounded-lg"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Password
              </label>

              <div className="relative">

                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  className="w-full mt-2 px-4 py-3 border rounded-lg"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
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

            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Don’t have an account?
            <Link
              to="/signup"
              className="text-indigo-600 ml-1"
            >
              Sign up
            </Link>
          </p>

        </div>

      </main>
    </div>
  );
}