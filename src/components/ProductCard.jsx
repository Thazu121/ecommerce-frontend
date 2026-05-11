import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Eye,
  Star,
} from "lucide-react";

import { useDispatch } from "react-redux";

import { addToCart } from "../redux/features/cartSlice";

export default function ProductCard({
  product,
}) {

  const dispatch = useDispatch();

  const handleAdd = () => {

    const cartProduct = {

      _id:
        product._id ||
        product.id,

      id:
        product._id ||
        product.id,

      title:
        product.title ||
        product.name ||
        "Product",

      price:
        Number(product.price) || 0,

      image:
        product.image || "",

      category:
        product.category ||
        "General",

      description:
        product.description || "",

      source:
        product.source || "fake",

      quantity: 1,
    };

    console.log(
      "ADDING TO CART:",
      cartProduct
    );

    dispatch(addToCart(cartProduct));

    alert("Added to cart");
  };

  const imageUrl =
    product.image &&
    product.image.trim() !== ""
      ? product.image
      : "https://via.placeholder.com/300";

  return (
    <div className="bg-zinc-900 text-white rounded-2xl overflow-hidden shadow-lg">

      <div className="bg-white p-4">

        <img
          src={imageUrl}
          alt={product.title}
          className="h-56 w-full object-contain"
        />

      </div>

      <div className="p-5">

        <p className="text-purple-400 text-sm uppercase mb-2">
          {product.category}
        </p>

        <h2 className="font-bold text-lg line-clamp-1">
          {product.title}
        </h2>

        <p className="text-zinc-400 text-sm line-clamp-2 mt-2">
          {product.description}
        </p>

        {product.rating && (

          <div className="flex items-center gap-1 mt-3">

            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-sm">
              {product.rating.rate}
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
            to={`/products/${
              product._id ||
              product.id
            }`}
            className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 py-2 rounded-xl"
          >
            <Eye size={18} />
            View
          </Link>

          <button
            onClick={handleAdd}
            className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-xl flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add
          </button>

        </div>

      </div>

    </div>
  );
}