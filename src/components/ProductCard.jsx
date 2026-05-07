import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";

import {
  ShoppingCart,
  Trash2,
  Eye,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";
import API from "../api/api"

export default function ProductCard({
  product,
  fetchProducts,
}) {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.auth);

  // 🛒 Add To Cart
  const handleAdd = () => {
    dispatch(
      addToCart({
        ...product,
        qty: 1,
      })
    );
  };

  // 🗑️ Delete Product (Admin)
  const handleDelete = async () => {
    try {
      await API.delete(`/products/${product._id}`);

      fetchProducts();

      alert("Product deleted");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">

      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <img
          src={
            product.image ||
            "https://via.placeholder.com/500"
          }
          alt={product.title}
          className="h-52 sm:h-64 w-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Category */}
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
          {product.category}
        </span>

        {/* Admin Delete */}
        {role === "admin" && (
          <button
            onClick={handleDelete}
            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">

          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
          <Star
            size={16}
            className="text-gray-300"
          />

          <span className="text-xs text-gray-500 ml-1">
            (4.0)
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg line-clamp-1">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.desc}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">

          <span className="text-indigo-600 font-bold text-lg">
            ₹{product.price}
          </span>

          {/* Stock */}
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              product.stock > 0
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} In Stock`
              : "Out of Stock"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-5">

          {/* View */}
          <Link
            to={`/product/${product._id}`}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition px-4 py-2 rounded-lg w-full text-sm font-medium"
          >
            <Eye size={18} />
            View
          </Link>

          {/* Add To Cart */}
          {role !== "admin" && (
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition text-white px-4 py-2 rounded-lg w-full text-sm font-medium disabled:opacity-50"
            >
              <ShoppingCart size={18} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}