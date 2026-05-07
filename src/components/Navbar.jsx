import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow sticky top-0 z-50">

        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">

          {/* LOGO */}
          <h1 className="text-xl font-bold text-indigo-600">
            LUXE
          </h1>

          {/* LINKS */}
          <div className="hidden md:flex gap-6 items-center">

            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/profile">Profile</Link>

          </div>

          {/* AUTH SECTION */}
          <div className="flex items-center gap-3">

            {/* IF USER LOGGED IN */}
            {user ? (
              <>
                {/* USER NAME */}
                <span className="text-sm font-medium text-gray-700">
                  👋 {user.name}
                </span>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              /* LOGIN BUTTON */
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            )}

          </div>

        </div>
      </nav>

      <Outlet />
    </>
  );
}