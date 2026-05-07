import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cartSlice";
import { addOrder } from "../redux/features/orderSlice";
import { useNavigate } from "react-router-dom";

import OrderSummary from "../components/OrderSummary";

import {
  CreditCard,
  MapPin,
  User,
 Building,
  ShoppingBag,
} from "lucide-react";

export default function Checkout() {
  const { items } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    card: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] =
    useState("");

  // 🧠 Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name =
        "Name is required";
    }

    // Address
    if (!form.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    // City
    if (!form.city.trim()) {
      newErrors.city =
        "City is required";
    }

    // Card
    const cardRegex =
      /^[0-9]{16}$/;

    if (
      !cardRegex.test(form.card)
    ) {
      newErrors.card =
        "Card must be 16 digits";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // 💰 Total
  const total = items.reduce(
    (acc, item) =>
      acc +
      item.price * item.quantity,
    0
  );

  // 🚀 Place Order
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMsg("");

    // Empty cart
    if (items.length === 0) {
      setErrorMsg(
        "Your cart is empty"
      );
      return;
    }
    // Validation
    if (!validate()) return;

    // Create order
    const order = {
      id: Date.now(),
      items,
      customer: form,
      total,
      status: "Processing",
      date:
        new Date().toISOString(),
    };

    // Save order
    dispatch(addOrder(order));

    // Clear cart
    dispatch(clearCart());

    // Redirect
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Checkout
          </h1>

          <p className="text-gray-500 mt-1">
            Complete your order
            securely
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT FORM */}
          <form
            onSubmit={
              handleSubmit
            }
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 md:p-8"
          >

            {/* Title */}
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">

              <ShoppingBag
                size={22}
              />

              Shipping Details
            </h2>

            {/* Error */}
            {errorMsg && (
              <div className="bg-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">

                {errorMsg}
              </div>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* Name */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">

                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={
                      form.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="John Doe"
                    className={`w-full border ${
                      errors.name
                        ? "border-red-400"
                        : "border-gray-300"
                    } rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200`}
                  />
                </div>

                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">

                    {
                      errors.name
                    }
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">

                  City
                </label>

                <div className="relative">

                  <Building
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="city"
                    value={
                      form.city
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Mumbai"
                    className={`w-full border ${
                      errors.city
                        ? "border-red-400"
                        : "border-gray-300"
                    } rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200`}
                  />
                </div>

                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">

                    {
                      errors.city
                    }
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mt-5">

              <label className="text-sm text-gray-600 mb-2 block">

                Address
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-3 top-4 text-gray-400"
                />

                <textarea
                  rows="4"
                  name="address"
                  value={
                    form.address
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Street address..."
                  className={`w-full border ${
                    errors.address
                      ? "border-red-400"
                      : "border-gray-300"
                  } rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 resize-none`}
                />
              </div>

              {errors.address && (
                <p className="text-red-500 text-xs mt-1">

                  {
                    errors.address
                  }
                </p>
              )}
            </div>

            {/* Card */}
            <div className="mt-5">

              <label className="text-sm text-gray-600 mb-2 block">

                Card Number
              </label>

              <div className="relative">

                <CreditCard
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="card"
                  value={
                    form.card
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="1234567812345678"
                  className={`w-full border ${
                    errors.card
                      ? "border-red-400"
                      : "border-gray-300"
                  } rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200`}
                />
              </div>

              {errors.card && (
                <p className="text-red-500 text-xs mt-1">

                  {
                    errors.card
                  }
                </p>
              )}
            </div>

            {/* Button */}
            <button
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 transition text-white py-4 rounded-xl font-medium text-lg"
            >

              Place Order
            </button>
          </form>

          {/* RIGHT */}
          <OrderSummary
            hideCheckout={
              true
            }
          />
        </div>
      </div>
    </div>
  );
}