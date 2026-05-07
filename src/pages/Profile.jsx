import { useState } from "react";
import { useSelector } from "react-redux";

import {
  User,
  Mail,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";

export default function Profile() {
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

  // 🧠 Handle Input (supports nested address)
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

  // 💾 Save (API later)
  const handleSave = () => {
    console.log("Updated Profile:", form);

    // TODO: connect API here

    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Profile
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your account information
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Banner */}
          <div className="h-36 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

          <div className="px-6 md:px-10 pb-10">

            {/* Avatar */}
            <div className="-mt-14 mb-6">
              <div className="w-28 h-28 rounded-full bg-white p-2 shadow-lg">
                <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
                  <User size={48} className="text-indigo-600" />
                </div>
              </div>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* NAME */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full border rounded-xl pl-10 pr-4 py-3 outline-none ${
                      editMode
                        ? "border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                        : "bg-gray-100 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full border rounded-xl pl-10 pr-4 py-3 outline-none ${
                      editMode
                        ? "border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                        : "bg-gray-100 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded-xl px-4 py-3 outline-none ${
                    editMode
                      ? "border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                      : "bg-gray-100 border-gray-200"
                  }`}
                />
              </div>

              {/* ROLE */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Account Role
                </label>
                <div className="flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3">
                  <ShieldCheck size={18} className="text-indigo-600" />
                  <span className="capitalize font-medium text-gray-700">
                    {user?.role || "user"}
                  </span>
                </div>
              </div>

              {/* ADDRESS - STREET */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Street
                </label>
                <input
                  name="street"
                  value={form.address.street}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full border rounded-xl px-4 py-3 outline-none bg-gray-100"
                />
              </div>

              {/* CITY */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  City
                </label>
                <input
                  name="city"
                  value={form.address.city}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full border rounded-xl px-4 py-3 outline-none bg-gray-100"
                />
              </div>

              {/* PINCODE */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Pincode
                </label>
                <input
                  name="pincode"
                  value={form.address.pincode}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full border rounded-xl px-4 py-3 outline-none bg-gray-100"
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Account Status
                </label>
                <div className="flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className="font-medium text-gray-700">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition text-white px-6 py-3 rounded-xl font-medium"
                >
                  <Pencil size={18} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 transition text-white px-6 py-3 rounded-xl font-medium"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 transition text-gray-700 px-6 py-3 rounded-xl font-medium"
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
    </div>
  );
}