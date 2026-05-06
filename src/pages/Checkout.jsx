import Navbar from "../components/Navbar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    card: "",
  });

  const [errors, setErrors] = useState({});

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validation
  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name required";
    if (!form.address) newErrors.address = "Address required";
    if (!form.city) newErrors.city = "City required";
    if (!form.card) newErrors.card = "Card required";

    if (form.card && form.card.length < 12)
      newErrors.card = "Invalid card number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!validate()) return;

    // 👉 here later you can save order in redux/db

    dispatch(clearCart());

    navigate("/orders"); // go to orders page
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid md:grid-cols-2 gap-8">

        {/* LEFT - FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <h1 className="text-xl font-semibold mb-2">
            Shipping Details
          </h1>

          {/* Name */}
          <div>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full border p-3 rounded ${
                errors.name ? "border-red-400" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className={`w-full border p-3 rounded ${
                errors.address ? "border-red-400" : ""
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className={`w-full border p-3 rounded ${
                errors.city ? "border-red-400" : ""
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          {/* Card */}
          <div>
            <input
              name="card"
              placeholder="Card Number"
              value={form.card}
              onChange={handleChange}
              className={`w-full border p-3 rounded ${
                errors.card ? "border-red-400" : ""
              }`}
            />
            {errors.card && (
              <p className="text-red-500 text-xs mt-1">{errors.card}</p>
            )}
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition">
            Place Order
          </button>
        </form>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-500">No items</p>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm mb-2"
                >
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-indigo-600">₹{total}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}