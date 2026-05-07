import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  // FETCH REAL DATA
  const fetchStats = async () => {
    try {
      setLoading(true);

      const [productsRes, usersRes] = await Promise.all([
        API.get("/products"),
        API.get("/users"),
      ]);

      setStats({
        products: productsRes.data?.length || 0,
        users: usersRes.data?.length || 0,
      });

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500">Loading stats...</p>
      )}

      {/* STATS GRID */}
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

    </div>
  );
}