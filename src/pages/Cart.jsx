import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
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

  const user = useSelector(
    (state) => state.auth.user
  );

  const dispatch = useDispatch();

  // LOAD CART
  useEffect(() => {
    if (user?._id) {
      const saved = localStorage.getItem(
        `cart_${user._id}`
      );

      if (saved) {
        const parsed = JSON.parse(saved);

        dispatch(clearCart());

        parsed.forEach((item) => {
          dispatch(addToCart(item));
        });
      }
    }
  }, [user, dispatch]);

  // SAVE CART
  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(
        `cart_${user._id}`,
        JSON.stringify(items)
      );
    }
  }, [items, user]);

  // IMAGE FIX
  const getImage = (img) => {
    if (!img)
      return "https://via.placeholder.com/300";

    if (img.startsWith("http")) {
      return img;
    }

    return `https://ecommerce-backendport-5000-mongo-uri.onrender.com${img}`;
  };

  // TOTALS FIX
  const subtotal = items.reduce(
    (acc, item) =>
      acc +
      (Number(item.price) || 0) *
        (Number(item.quantity) || 1),
    0
  );

  const delivery = subtotal > 5000 ? 0 : 99;

  const total = subtotal + delivery;

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const payload = {
        products: items.map((item) => ({
          productId: String(
            item._id || item.id
          ),

          source:
            item.source || "mongo",

          title:
            item.title ||
            item.name ||
            "Product",

          image: item.image || "",

          price:
            Number(item.price) || 0,

          quantity:
            Number(item.quantity) || 1,
        })),

        totalPrice:
          Number(total) || 0,
      };

      console.log(
        "ORDER PAYLOAD:",
        payload
      );

      const res = await API.post(
        "/order",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      dispatch(clearCart());

      localStorage.removeItem(
        `cart_${user._id}`
      );

      alert("Order placed successfully");

    } catch (err) {
      console.log(
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Order failed"
      );
    }
  };

  // EMPTY CART
  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-400">
        <ShoppingCart size={80} />

        <p className="mt-3 text-lg">
          Your cart is empty
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">

      {/* CART ITEMS */}
      <div className="lg:col-span-2 space-y-4">

        {items.map((item) => (

          <div
            key={item._id || item.id}
            className="bg-zinc-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row gap-4"
          >

            {/* IMAGE */}
            <img
              src={getImage(item.image)}
              alt={
                item.title ||
                item.name
              }
              className="w-full sm:w-32 h-32 object-contain bg-white rounded-xl p-2"
            />

            {/* INFO */}
            <div className="flex-1">

              <h2 className="font-semibold text-lg">
                {item.title ||
                  item.name}
              </h2>

              <p className="text-zinc-400 text-sm mt-1">
                ₹
                {Number(item.price) || 0}
              </p>

              {/* QTY */}
              <div className="flex items-center gap-3 mt-4">

                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity(
                        item._id ||
                          item.id
                      )
                    )
                  }
                  className="p-2 bg-zinc-800 rounded"
                >
                  <Minus size={16} />
                </button>

                <span className="px-3">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch(
                      addToCart(item)
                    )
                  }
                  className="p-2 bg-zinc-800 rounded"
                >
                  <Plus size={16} />
                </button>

              </div>
            </div>

            {/* PRICE */}
            <div className="flex sm:flex-col justify-between items-center sm:items-end">

              <p className="text-purple-500 font-bold text-lg">
                ₹
                {(Number(item.price) || 0) *
                  (Number(
                    item.quantity
                  ) || 1)}
              </p>

              <button
                onClick={() =>
                  dispatch(
                    removeFromCart(
                      item._id ||
                        item.id
                    )
                  )
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

          <span>
            ₹{subtotal}
          </span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Delivery</span>

          <span>
            {delivery === 0
              ? "Free"
              : `₹${delivery}`}
          </span>
        </div>

        <div className="flex justify-between mt-4 text-lg font-bold">
          <span>Total</span>

          <span className="text-purple-500">
            ₹{total}
          </span>
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