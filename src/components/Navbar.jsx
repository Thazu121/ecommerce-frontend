import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { useState } from "react";

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

  return (
    <>
      <nav className="bg-white shadow sticky top-0 z-50">

        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-6 py-4">

          {/* LOGO */}
          <h1 className="text-xl font-bold text-indigo-600">
            LUXE
          </h1>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-6 items-center">

            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/profile">Profile</Link>

          </div>

          {/* AUTH (DESKTOP) */}
          <div className="hidden md:flex items-center gap-3">

            {user ? (
              <>
                <span className="text-sm font-medium text-gray-700">
                  👋 {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t">

            <Link onClick={() => setMenuOpen(false)} to="/">
              Home
            </Link>

            <Link onClick={() => setMenuOpen(false)} to="/cart">
              Cart
            </Link>

            <Link onClick={() => setMenuOpen(false)} to="/orders">
              Orders
            </Link>

            <Link onClick={() => setMenuOpen(false)} to="/profile">
              Profile
            </Link>

            <hr />

            {user ? (
              <div className="flex flex-col gap-2">

                <span className="text-gray-700">
                  👋 {user.name}
                </span>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>

              </div>
            ) : (
              <Link
                onClick={() => setMenuOpen(false)}
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded inline-block"
              >
                Login
              </Link>
            )}

          </div>
        )}

      </nav>

      <Outlet />
    </>
  );
}