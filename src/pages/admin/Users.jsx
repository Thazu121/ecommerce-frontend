import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/users");

      console.log("USERS RESPONSE:", res.data);

      const data =
        Array.isArray(res.data)
          ? res.data
          : res.data.users ||
            res.data.data ||
            [];

      setUsers(data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= UI =================
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        👥 Users Management
      </h1>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500">Loading users...</p>
      )}

      {/* EMPTY */}
      {!loading && users.length === 0 && (
        <p className="text-gray-500">No users found</p>
      )}

      {/* USERS LIST */}
      <div className="space-y-3">

        {Array.isArray(users) &&
          users.map((u) => (
            <div
              key={u._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >

              {/* USER INFO */}
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-gray-500 text-sm">{u.email}</p>
              </div>

              {/* ROLE */}
              <span className="px-3 py-1 bg-gray-100 rounded text-sm capitalize">
                {u.role}
              </span>

            </div>
          ))}
      </div>
    </div>
  );
}