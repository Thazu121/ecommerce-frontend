import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { useEffect, useState } from "react";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, []);

  return (
    <>
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-6 py-4">

          <h1 className="text-xl font-bold text-indigo-600">
            LUXE
          </h1>

          <div className="hidden md:flex gap-6 items-center">
            <Link className="hover:text-indigo-600" to="/">Home</Link>
            <Link className="hover:text-indigo-600" to="/cart">Cart</Link>
            <Link className="hover:text-indigo-600" to="/orders">Orders</Link>
            <Link className="hover:text-indigo-600" to="/profile">Profile</Link>

            <Link className="hover:text-indigo-600" to="/contact">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-700">
                  👋 {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-2xl"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        <div
          className={`fixed inset-0 bg-black/40 md:hidden transition-opacity duration-300 ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg md:hidden transform transition-transform duration-300 z-50 p-6 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-4 text-lg font-medium">

            <Link
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-600 py-2 border-b"
              to="/"
            >
              Home
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-600 py-2 border-b"
              to="/cart"
            >
              Cart
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-600 py-2 border-b"
              to="/orders"
            >
              Orders
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-600 py-2 border-b"
              to="/profile"
            >
              Profile
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-600 py-2 border-b"
              to="/contact"
            >
              Contact
            </Link>

          </div>

          <hr className="my-5" />

          {user ? (
            <div className="space-y-3">
              <p className="text-gray-700 font-medium">👋 {user.name}</p>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              onClick={() => setMenuOpen(false)}
              to="/login"
              className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
}