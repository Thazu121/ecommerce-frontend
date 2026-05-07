import { Outlet, Link, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-zinc-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-6">
          Admin Panel
        </h1>

        <nav className="flex md:flex-col gap-3 overflow-x-auto">

          <Link
            to="/admin"
            className={`px-3 py-2 rounded ${
              isActive("/admin") ? "bg-indigo-600" : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className={`px-3 py-2 rounded ${
              isActive("/admin/products") ? "bg-indigo-600" : ""
            }`}
          >
            Products
          </Link>

          <Link
            to="/admin/users"
            className={`px-3 py-2 rounded ${
              isActive("/admin/users") ? "bg-indigo-600" : ""
            }`}
          >
            Users
          </Link>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-gray-100 p-4 md:p-6">
        <Outlet />
      </main>

    </div>
  );
}