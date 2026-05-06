import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow sticky top-20">

      <h2 className="text-lg font-semibold mb-4">
        Order Summary
      </h2>

      <div className="flex justify-between text-sm mb-2">
        <span>Items</span>
        <span>{items.length}</span>
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span>Total</span>
        <span className="font-bold text-indigo-600">
          ₹{total}
        </span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={items.length === 0}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition disabled:opacity-50"
      >
        Checkout
      </button>

      <button
        onClick={() => dispatch(clearCart())}
        className="w-full mt-3 text-sm text-red-500 hover:underline"
      >
        Clear Cart
      </button>
    </div>
  );
}