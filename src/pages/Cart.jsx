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
      const savedCart = localStorage.getItem(
        `cart_${user._id}`
      );

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

  const handlePlaceOrder = async () => {
  try {

    const token = localStorage.getItem("token");

    const payload = {
      products: items.map((item) => ({
        productId: item.id || item._id,

        title: item.title,

        image: item.image,

        price: Number(item.price),

        quantity: Number(item.quantity),
      })),
    };

    console.log(payload);

    await API.post(
      "/order",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Order placed successfully");

    dispatch(clearCart());

    localStorage.removeItem(
      `cart_${user._id}`
    );

  } catch (err) {

    console.log(
      err.response?.data || err
    );

    alert(
      err.response?.data?.message ||
      "Order failed"
    );
  }
};
  // =========================
  // EMPTY CART
  // =========================
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">

        <div className="bg-zinc-900 text-white rounded-3xl p-10 text-center max-w-md w-full shadow-xl">

          <ShoppingCart
            size={80}
            className="mx-auto text-zinc-500 mb-5"
          />

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
            className="bg-zinc-900 text-white rounded-2xl p-5 flex flex-col md:flex-row gap-5 shadow-lg hover:shadow-purple-500/10 transition"
          >

            {/* IMAGE */}
            <div className="flex justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-contain bg-white rounded-xl p-3"
              />
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col justify-between">

              <div>

                <h2 className="text-xl font-semibold line-clamp-1">
                  {item.title}
                </h2>

                <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                  {item.description || item.desc}
                </p>

              </div>

              {/* BOTTOM */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                {/* QUANTITY */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          ...item,
                          quantity: -1,
                        })
                      )
                    }
                    className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="text-lg font-bold w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(addToCart(item))
                    }
                    className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition"
                  >
                    <Plus size={18} />
                  </button>

                </div>

                {/* PRICE + REMOVE */}
                <div className="flex items-center justify-between md:justify-end gap-6">

                  <span className="text-2xl font-bold text-purple-500">
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.id || item._id))
                    }
                    className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>

                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-zinc-900 text-white rounded-3xl p-6 h-fit sticky top-24 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Order Summary
        </h2>

        <div className="space-y-4 border-b border-zinc-700 pb-5">

          <div className="flex justify-between">
            <span className="text-zinc-400">
              Subtotal
            </span>

            <span>
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">
              Delivery
            </span>

            <span>
              {delivery === 0 ? "Free" : `₹${delivery}`}
            </span>
          </div>

        </div>

        {/* TOTAL */}
        <div className="flex justify-between items-center mt-6 mb-8">

          <span className="text-xl font-semibold">
            Total
          </span>

          <span className="text-3xl font-bold text-purple-500">
            ₹{total.toFixed(2)}
          </span>

        </div>

        {/* BUTTON */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition"
        >
          <CreditCard size={22} />
          Place Order
        </button>

      </div>

    </div>
  );
}