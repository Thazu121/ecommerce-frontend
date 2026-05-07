import Navbar from "../components/Navbar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cartSlice";
import { addOrder } from "../redux/features/orderSlice";
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
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // improved validation
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name required";
    if (!form.address.trim()) newErrors.address = "Address required";
    if (!form.city.trim()) newErrors.city = "City required";

    // simple card validation (16 digits)
    const cardRegex = /^[0-9]{16}$/;
    if (!cardRegex.test(form.card)) {
      newErrors.card = "Card must be 16 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (items.length === 0) {
      setErrorMsg("Cart is empty");
      return;
    }

    if (!validate()) return;

    const order = {
      id: Date.now(),
      items,
      customer: form,
      total,
      date: new Date().toISOString(),
    };

    // ✅ save order first
    dispatch(addOrder(order));

    // then clear cart
    dispatch(clearCart());

    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <h1 className="text-xl font-semibold">Shipping Details</h1>

          {errorMsg && (
            <p className="text-red-500 text-sm">{errorMsg}</p>
          )}

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}

          <input
            name="card"
            placeholder="Card Number (16 digits)"
            value={form.card}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          {errors.card && <p className="text-red-500 text-xs">{errors.card}</p>}

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500">
            Place Order
          </button>
        </form>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

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