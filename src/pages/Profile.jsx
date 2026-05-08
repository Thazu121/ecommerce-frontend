import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "../api/api";
import { setUser } from "../redux/features/authSlice";

import {
  User,
  Mail,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      pincode: user?.address?.pincode || "",
    },
  });

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in form.address) {
      setForm({
        ...form,
        address: {
          ...form.address,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      // clean payload (IMPORTANT FIX)
      const payload = {
        name: form.name?.trim(),
        email: form.email?.trim(),
        phone: form.phone?.trim(),
        address: {
          street: form.address.street?.trim(),
          city: form.address.city?.trim(),
          pincode: form.address.pincode?.trim(),
        },
      };

      const res = await API.put("/user/profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("UPDATED USER:", res.data);

      // update redux
      dispatch(setUser(res.data.user));

      setEditMode(false);

      alert("Profile updated successfully");

    } catch (err) {
      console.log("FULL ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="bg-white p-6 rounded-2xl shadow">

          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded"
              placeholder="Name"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded"
              placeholder="Email"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded"
              placeholder="Phone (10 digits)"
            />

            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded">
              <ShieldCheck size={18} />
              {user?.role}
            </div>

            <input
              name="street"
              value={form.address.street}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded"
              placeholder="Street"
            />

            <input
              name="city"
              value={form.address.city}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded"
              placeholder="City"
            />

            <input
              name="pincode"
              value={form.address.pincode}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded"
              placeholder="Pincode"
            />

          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-3">

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-indigo-600 text-white px-5 py-2 rounded flex items-center gap-2"
              >
                <Pencil size={18} />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-5 py-2 rounded flex items-center gap-2"
                >
                  <Save size={18} />
                  Save
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 px-5 py-2 rounded flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}