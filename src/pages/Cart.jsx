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

  const dispatch = useDispatch();

  const { items } = useSelector(
    (state) => state.cart
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  
  useEffect(() => {

    if (user?._id) {

      localStorage.setItem(
        `cart_${user._id}`,
        JSON.stringify(items)
      );
    }

  }, [items, user]);


  const getImage = (img) => {

    if (!img) {
      return "https://via.placeholder.com/300";
    }

    if (img.startsWith("http")) {
      return img;
    }

    return `https://ecommerce-backendport-5000-mongo-uri.onrender.com${img}`;
  };

  
  const subtotal = items.reduce(
    (acc, item) =>
      acc +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const delivery =
    subtotal > 5000 ? 0 : 99;

  const total = subtotal + delivery;

 
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

          productId:
            item._id || item.id,

          title:
            item.title ||
            item.name,

          image:
            item.image,

          price:
            Number(item.price),

          quantity:
            Number(item.quantity),

          source:
            item.source || "fake",
        })),

        totalPrice: total,
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

      dispatch(clearCart());

      localStorage.removeItem(
        `cart_${user._id}`
      );

      alert(
        "Order placed successfully"
      );

    } catch (err) {

      console.log(
        err.response?.data ||
          err.message
      );

      alert("Order failed");
    }
  };

 
  if (items.length === 0) {

    return (

      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400">

        <ShoppingCart size={80} />

        <p className="mt-4 text-lg">
          Your cart is empty
        </p>

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">

      <div className="lg:col-span-2 space-y-4">

        {items.map((item) => (

          <div
            key={item._id || item.id}
            className="bg-zinc-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row gap-5"
          >

            <img
              src={getImage(item.image)}
              alt={item.title}
              className="w-full sm:w-32 h-32 object-contain bg-white rounded-xl p-2"
            />

            <div className="flex-1">

              <h2 className="text-lg font-semibold">
                {item.title}
              </h2>

              <p className="text-zinc-400 mt-1">
                ₹{item.price}
              </p>

              {/* QUANTITY */}
              <div className="flex items-center gap-3 mt-5">

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

                <span>
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

            <div className="flex sm:flex-col justify-between items-end">

              <p className="text-xl font-bold text-purple-500">

                ₹
                {item.price *
                  item.quantity}

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
                className="text-red-400"
              >
                <Trash2 />
              </button>

            </div>

          </div>
        ))}
      </div>

      <div className="bg-zinc-900 text-white rounded-2xl p-5 h-fit">

        <h2 className="text-2xl font-bold mb-5">
          Order Summary
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>
              {delivery === 0
                ? "Free"
                : `₹${delivery}`}
            </span>
          </div>

          <div className="flex justify-between text-lg font-bold pt-3 border-t border-zinc-700">

            <span>Total</span>

            <span className="text-purple-500">
              ₹{total}
            </span>

          </div>

        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl"
        >
          Place Order
        </button>

      </div>

    </div>
  );
}