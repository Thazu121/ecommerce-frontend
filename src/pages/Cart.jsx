import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
} from "../redux/features/cartSlice";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
} from "lucide-react";

import API from "../api/api";

export default function CartList() {

  const { items } = useSelector(
    (state) => state.cart
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  useEffect(() => {

    if (user?._id) {

      const savedCart =
        localStorage.getItem(
          `cart_${user._id}`
        );

      if (savedCart) {

        const parsedCart =
          JSON.parse(savedCart);

        dispatch(clearCart());

        parsedCart.forEach((item) => {
          dispatch(addToCart(item));
        });
      }
    }

  }, [user]);

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
      return "/placeholder.png";
    }

    // FakeStore image
    if (img.startsWith("http")) {
      return img;
    }

    return `https://ecommerce-backendport-5000-mongo-uri.onrender.com${img}`;
  };


  const subtotal = items.reduce(
    (acc, item) =>
      acc +
      item.price * item.quantity,
    0
  );

  const delivery =
    subtotal > 5000 ? 0 : 99;

  const total =
    subtotal + delivery;

  const handlePlaceOrder =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        // LOGIN CHECK
        if (!token) {

          alert(
            "Please login first"
          );

          navigate("/login");

          return;
        }

        if (items.length === 0) {

          alert(
            "Cart is empty"
          );

          return;
        }

        const payload = {

          products: items.map(
            (item) => ({

              productId:
                item._id ||
                item.id,

              quantity:
                Number(
                  item.quantity
                ),

            })
          ),

          totalPrice: total,
        };

        console.log(
          "ORDER PAYLOAD:",
          payload
        );

        const res =
          await API.post(
            "/order",
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        console.log(res.data);

        // CLEAR CART
        dispatch(clearCart());

        localStorage.removeItem(
          `cart_${user._id}`
        );

        alert(
          "Order placed successfully"
        );

        navigate("/orders");

      } catch (err) {

        console.log(
          err.response?.data ||
            err.message
        );

        alert(
          err.response?.data
            ?.message ||
            "Order failed"
        );
      }
    };

  
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

   
      <div className="lg:col-span-2 space-y-4">

        {items.map((item) => (

          <div
            key={
              item.id ||
              item._id
            }
            className="bg-zinc-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row gap-4"
          >

            <img
              src={getImage(
                item.image
              )}
              alt={
                item.title ||
                item.name
              }
              className="w-full sm:w-32 h-32 object-contain bg-white rounded-xl p-2"
            />

            <div className="flex-1">

              <h2 className="font-semibold text-lg">

                {item.title ||
                  item.name}

              </h2>

              <div className="flex items-center gap-3 mt-4">

                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity(
                        item.id ||
                          item._id
                      )
                    )
                  }
                  className="p-2 bg-zinc-800 rounded"
                >

                  <Minus size={16} />

                </button>

                {/* QTY */}
                <span className="px-3">

                  {item.quantity}

                </span>

                {/* PLUS */}
                <button
                  onClick={() =>
                    dispatch(
                      addToCart(
                        item
                      )
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
                {(
                  item.price *
                  item.quantity
                ).toFixed(2)}

              </p>

              <button
                onClick={() =>
                  dispatch(
                    removeFromCart(
                      item.id ||
                        item._id
                    )
                  )
                }
                className="text-red-400 mt-2 hover:text-red-500"
              >

                <Trash2 />

              </button>

            </div>

          </div>
        ))}

      </div>

      
      <div className="bg-zinc-900 text-white p-5 rounded-2xl h-fit sticky top-24">

        <h2 className="text-xl font-bold mb-4">

          Order Summary

        </h2>

        <div className="flex justify-between">

          <span>
            Subtotal
          </span>

          <span>
            ₹
            {subtotal.toFixed(
              2
            )}
          </span>

        </div>

        <div className="flex justify-between mt-2">

          <span>
            Delivery
          </span>

          <span>

            {delivery === 0
              ? "Free"
              : `₹${delivery}`}

          </span>

        </div>

        <div className="flex justify-between mt-4 text-lg font-bold border-t border-zinc-700 pt-4">

          <span>
            Total
          </span>

          <span className="text-purple-500">

            ₹
            {total.toFixed(
              2
            )}

          </span>

        </div>

        <button
          onClick={
            handlePlaceOrder
          }
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl transition font-semibold"
        >

          Place Order

        </button>

      </div>

    </div>
  );
}