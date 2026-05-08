import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  const imageUrl =
    product.image && product.image.trim() !== ""
      ? product.image
      : "https://via.placeholder.com/300x300?text=No+Image";

  const title = product.name || product.title || "No Title";

  const category = product.category || "General";

  return (
    <div className="bg-zinc-900 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300 group">

      <div className="overflow-hidden bg-white p-4">
        <img
          src={imageUrl}
          alt={title}
          className="h-56 w-full object-contain group-hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-5">

        <p className="text-purple-400 text-sm uppercase mb-2">
          {category}
        </p>

        <h2 className="font-bold text-lg line-clamp-1">
          {title}
        </h2>

        <p className="text-zinc-400 text-sm line-clamp-2 mt-2">
          {product.description || "No description available"}
        </p>

        {product.rating && (
          <div className="flex items-center gap-1 mt-3">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />

            <span className="text-sm text-zinc-300">
              {product.rating.rate}
            </span>

            <span className="text-xs text-zinc-500">
              ({product.rating.count})
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-2xl font-bold text-purple-500">
            ₹ {product.price}
          </p>
        </div>

        <div className="flex gap-3 mt-5">

          <Link
            to={`/products/${product.id || product._id}`}
            className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 hover:border-purple-500 hover:bg-purple-500/10 py-2 rounded-xl transition"
          >
            <Eye size={18} />
            View
          </Link>

          <button
            onClick={handleAdd}
            className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <ShoppingCart size={18} />
            Add
          </button>

        </div>

      </div>
    </div>
  );
}