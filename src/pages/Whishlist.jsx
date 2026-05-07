import { useDispatch, useSelector } from "react-redux";
import { Trash2, ShoppingCart } from "lucide-react";

import {
  removeFromWishlist,
} from "../redux/features/wishlistSlice";

import { addToCart } from "../redux/features/cartSlice";

import { Link } from "react-router-dom";

export default function Wishlist() {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ ...product, _id: product._id }));
    dispatch(removeFromWishlist(product._id));
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Your Wishlist is Empty ❤️
        </h2>

        <p className="text-gray-500 mt-2">
          Save products you love here
        </p>

        <Link
          to="/"
          className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        My Wishlist ❤️
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {wishlist.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            {/* IMAGE */}
            <div className="h-52 flex items-center justify-center bg-gray-50">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">

              <h2 className="font-semibold line-clamp-1">
                {product.title}
              </h2>

              <p className="text-indigo-600 font-bold mt-1">
                ₹{product.price}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-4">

                {/* MOVE TO CART */}
                <button
                  onClick={() =>
                    handleMoveToCart(product)
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500"
                >
                  <ShoppingCart size={16} />
                  Cart
                </button>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    handleRemove(product._id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                >
                  <Trash2 size={16} />
                  Remove
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}