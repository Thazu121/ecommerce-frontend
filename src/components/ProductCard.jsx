import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 sm:h-60 w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
          {product.title}
        </h3>

        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
          {product.desc}
        </p>

        {/* Bottom */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-indigo-600 font-bold text-sm sm:text-base">
            ₹{product.price}
          </span>

          <button
            onClick={handleAdd}
            className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm hover:bg-indigo-500 active:scale-95 transition"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}