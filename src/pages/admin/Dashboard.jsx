import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsRes, usersRes] = await Promise.all([
        API.get("/products"),
        API.get("/admin/users"), // 🔥 FIXED
      ]);

      const products =
        productsRes.data?.products ||
        productsRes.data?.product ||
        [];

      const users =
        usersRes.data?.users ||
        usersRes.data?.user ||
        [];

      setStats({
        products: Array.isArray(products) ? products.length : 0,
        users: Array.isArray(users) ? users.length : 0,
      });

    } catch (err) {
      console.log("DASHBOARD ERROR:", err.response?.data || err.message);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Total Products</h2>
            <p className="text-2xl font-bold text-indigo-600">
              {stats.products}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Users</h2>
            <p className="text-2xl font-bold text-purple-600">
              {stats.users}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}