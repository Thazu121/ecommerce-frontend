import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  CreditCard,
  Trash2,
  ShieldCheck,
} from "lucide-react";

export default function OrderSummary({
  hideCheckout = false,
}) {
  const { items } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================
  // CALCULATIONS
  // =========================
  const subtotal = items.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const shipping =
    subtotal > 5000 ? 0 : 99;

  const total = subtotal + shipping;

  const totalItems = items.reduce(
    (acc, item) =>
      acc + item.quantity,
    0
  );

  // =========================
  // CHECKOUT
  // =========================
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-zinc-900 text-white rounded-3xl shadow-xl border border-zinc-800 p-6 sticky top-24 h-fit">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">

        <div className="bg-purple-600/20 p-3 rounded-2xl">

          <ShoppingBag
            size={24}
            className="text-purple-500"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          <p className="text-sm text-zinc-400 mt-1">
            Review your selected items
          </p>

        </div>
      </div>

      {/* EMPTY CART */}
      {items.length === 0 ? (
        <div className="text-center py-14">

          <ShoppingBag
            size={70}
            className="mx-auto text-zinc-600 mb-5"
          />

          <h3 className="text-xl font-semibold mb-2">
            Your cart is empty
          </h3>

          <p className="text-zinc-500 text-sm">
            Add products to continue shopping
          </p>

        </div>
      ) : (
        <>
          {/* PRODUCT LIST */}
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">

            {items.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-800 rounded-2xl p-3 flex items-center gap-4 hover:bg-zinc-700 transition"
              >

                {/* IMAGE */}
                <div className="bg-white rounded-xl p-2">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />

                </div>

                {/* INFO */}
                <div className="flex-1 min-w-0">

                  <h3 className="font-medium line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 text-sm mt-1">
                    Qty: {item.quantity}
                  </p>

                </div>

                {/* PRICE */}
                <span className="font-bold text-purple-400 whitespace-nowrap">

                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}

                </span>
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div className="border-t border-zinc-700 my-6"></div>

          {/* SUMMARY */}
          <div className="space-y-5">

            {/* ITEMS */}
            <div className="flex justify-between text-zinc-400">

              <span>Total Items</span>

              <span className="font-medium text-white">
                {totalItems}
              </span>
            </div>

            {/* SUBTOTAL */}
            <div className="flex justify-between text-zinc-400">

              <span>Subtotal</span>

              <span className="font-medium text-white">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            {/* SHIPPING */}
            <div className="flex justify-between text-zinc-400">

              <span>Shipping</span>

              <span className="font-medium text-green-400">

                {shipping === 0
                  ? "Free"
                  : `₹${shipping}`}

              </span>
            </div>

            {/* TOTAL */}
            <div className="border-t border-zinc-700 pt-5 flex justify-between items-center">

              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-3xl font-bold text-purple-500">

                ₹{total.toFixed(2)}

              </span>
            </div>
          </div>

          {/* CHECKOUT BUTTON */}
          {!hideCheckout && (
            <button
              onClick={handleCheckout}
              className="w-full mt-7 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg"
            >

              <CreditCard size={22} />

              Proceed to Checkout

            </button>
          )}

          {/* CLEAR CART */}
          <button
            onClick={() =>
              dispatch(clearCart())
            }
            className="w-full mt-4 border border-red-500/30 hover:bg-red-500/10 text-red-400 transition py-3 rounded-2xl font-medium flex items-center justify-center gap-2"
          >

            <Trash2 size={18} />

            Clear Cart

          </button>

          {/* SECURITY */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-zinc-500">

            <ShieldCheck size={15} />

            100% Secure Checkout

          </div>
        </>
      )}
    </div>
  );
}