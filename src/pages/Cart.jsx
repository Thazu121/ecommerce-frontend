import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../redux/features/cartSlice";

import { addOrder } from "../redux/features/orderSlice";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

import API from "../api/api";

export default function CartList() {
  const { items } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  // =========================
  // LOAD USER CART
  // =========================
  useEffect(() => {
    if (user?._id) {
      const savedCart = localStorage.getItem(`cart_${user._id}`);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        dispatch(clearCart());

        parsedCart.forEach((item) => {
          dispatch(addToCart(item));
        });
      }
    }
  }, [user]);

  // =========================
  // SAVE USER CART
  // =========================
  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(
        `cart_${user._id}`,
        JSON.stringify(items)
      );
    }
  }, [items, user]);

  // =========================
  // TOTALS
  // =========================
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 5000 ? 0 : 99;
  const total = subtotal + delivery;

  // =========================
  // PLACE ORDER (FIXED)
  // =========================
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (items.length === 0) {
        alert("Cart is empty");
        return;
      }

      const payload = {
        products: items.map((item) => ({
          productId: item.id || item._id,
          title: item.title,
          image: item.image,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      };

      // 🔥 BACKEND ORDER
      const res = await API.post("/order", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 REDUX ORDER (IMPORTANT FIX)
      const newOrder = {
        id: res.data?.order?._id || Date.now(),
        items,
        total,
        status: "Processing",
        date: new Date().toISOString(),
      };

      dispatch(addOrder(newOrder));

      alert("Order placed successfully");

      dispatch(clearCart());

      localStorage.removeItem(`cart_${user._id}`);

    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Order failed");
    }
  };

  // =========================
  // EMPTY CART
  // =========================
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-zinc-900 text-white rounded-3xl p-10 text-center max-w-md w-full shadow-xl">
          <ShoppingCart size={80} className="mx-auto text-zinc-500 mb-5" />
          <h2 className="text-3xl font-bold mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-zinc-400">
            Add some amazing products to continue shopping.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">

      {/* CART ITEMS */}
      <div className="lg:col-span-2 space-y-5">

        {items.map((item) => (
          <div
            key={item.id || item._id}
            className="bg-zinc-900 text-white rounded-2xl p-5 flex flex-col md:flex-row gap-5 shadow-lg"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              className="w-32 h-32 object-contain bg-white rounded-xl p-3"
            />

            {/* INFO */}
            <div className="flex-1">

              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <p className="text-zinc-400 text-sm mt-2">
                {item.description || item.desc}
              </p>

              {/* QUANTITY */}
              <div className="flex items-center gap-3 mt-4">

                <button
                  onClick={() =>
                    dispatch(addToCart({ ...item, quantity: -1 }))
                  }
                  className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center"
                >
                  <Minus size={18} />
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center"
                >
                  <Plus size={18} />
                </button>

              </div>
            </div>

            {/* PRICE + REMOVE */}
            <div className="text-right">

              <p className="text-xl text-purple-500 font-bold">
                ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() =>
                  dispatch(removeFromCart(item.id || item._id))
                }
                className="text-red-400 flex items-center gap-1 mt-3"
              >
                <Trash2 size={16} />
                Remove
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="bg-zinc-900 text-white rounded-3xl p-6 h-fit sticky top-24">

        <h2 className="text-2xl font-bold mb-6">
          Order Summary
        </h2>

        <div className="space-y-3 border-b border-zinc-700 pb-5">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
          </div>
        </div>

        <div className="flex justify-between mt-6 text-xl font-bold">
          <span>Total</span>
          <span className="text-purple-500">₹{total}</span>
        </div>

        {/* PLACE ORDER */}
        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl flex items-center justify-center gap-2"
        >
          <CreditCard size={20} />
          Place Order
        </button>

      </div>
    </div>
  );
}