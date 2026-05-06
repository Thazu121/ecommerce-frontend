import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cartSlice";

export default function CartList() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 bg-white p-4 rounded-xl shadow"
        >

          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
          />

          {/* Info */}
          <div className="flex-1">

            <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
              {item.title}
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm">
              {item.desc}
            </p>

            {/* Bottom */}
            <div className="flex flex-wrap justify-between items-center mt-3 gap-2">

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch(addToCart({ ...item, quantity: -1 }))
                  }
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>

                <span className="text-sm">{item.quantity}</span>

                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Price */}
              <span className="font-bold text-indigo-600 text-sm sm:text-base">
                ₹{item.price * item.quantity}
              </span>
            </div>

            {/* Remove */}
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 text-xs mt-2 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}