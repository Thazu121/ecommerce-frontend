import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../redux/features/cartSlice";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
} from "lucide-react";

import API from "../api/api";

export default function CartList() {
  const { items } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // LOAD CART
  useEffect(() => {
    if (user?._id) {
      const saved = localStorage.getItem(`cart_${user._id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch(clearCart());
        parsed.forEach((i) => dispatch(addToCart(i)));
      }
    }
  }, [user]);

  // SAVE CART
  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(items));
    }
  }, [items, user]);

  const getImage = (img) => {
    if (!img) return "/placeholder.png";
    if (img.startsWith("http")) return img;
    return `http://localhost:5000${img}`;
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 5000 ? 0 : 99;
  const total = subtotal + delivery;

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        products: items.map((item) => ({
          productId: String(item.id || item._id),
          source: item.source || "mongo",
          title: item.title || item.name,
          image: item.image || "",
          price: Number(item.price),
          quantity: Number(item.quantity || 1),
        })),
        totalPrice: total,
      };

      await API.post("/order", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(clearCart());
      localStorage.removeItem(`cart_${user._id}`);

      alert("Order placed successfully");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Order failed");
    }
  };

  // EMPTY CART
  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-400">
        <ShoppingCart size={80} />
        <p className="mt-3 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">

      {/* ITEMS */}
      <div className="lg:col-span-2 space-y-4">

        {items.map((item) => (
          <div
            key={item.id || item._id}
            className="bg-zinc-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row gap-4"
          >

            {/* IMAGE */}
            <img
              src={getImage(item.image)}
              alt={item.title || item.name}
              className="w-full sm:w-32 h-32 object-contain bg-white rounded-xl p-2"
            />

            {/* INFO */}
            <div className="flex-1">

              <h2 className="font-semibold text-lg">
                {item.title || item.name}
              </h2>

              {/* QTY */}
              <div className="flex items-center gap-3 mt-4">

                <button
                  onClick={() =>
                    dispatch(removeFromCart(item.id || item._id))
                  }
                  className="p-2 bg-zinc-800 rounded"
                >
                  <Minus size={16} />
                </button>

                <span className="px-3">{item.quantity}</span>

                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="p-2 bg-zinc-800 rounded"
                >
                  <Plus size={16} />
                </button>

              </div>
            </div>

            {/* PRICE + DELETE */}
            <div className="flex sm:flex-col justify-between items-center sm:items-end">

              <p className="text-purple-500 font-bold text-lg">
                ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() =>
                  dispatch(removeFromCart(item.id || item._id))
                }
                className="text-red-400 mt-2"
              >
                <Trash2 />
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* SUMMARY */}
      <div className="bg-zinc-900 text-white p-5 rounded-2xl h-fit">

        <h2 className="text-xl font-bold mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Delivery</span>
          <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
        </div>

        <div className="flex justify-between mt-4 text-lg font-bold">
          <span>Total</span>
          <span className="text-purple-500">₹{total}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl transition"
        >
          Place Order
        </button>

      </div>

    </div>
  );
}