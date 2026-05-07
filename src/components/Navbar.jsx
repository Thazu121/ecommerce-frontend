import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">

          <h1 className="text-xl font-bold text-indigo-600">
            LUXE
          </h1>

          <div className="hidden md:flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/profile">Profile</Link>
          </div>

          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Login
          </Link>

        </div>
      </nav>

      {/* 👇 VERY IMPORTANT */}
      <Outlet />
    </>
  );
}