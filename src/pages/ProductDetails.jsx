import { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";

export default function ProductDetails() {
  const [qty, setQty] = useState(1);

  const product = {
    title: "Lumina Essence Lamp",
    price: 129,
    image: "https://via.placeholder.com/600x600",
    desc: "Premium minimalist lamp designed for modern interiors with elegant lighting and aesthetic appeal.",
    category: "Home Decor",
    stock: 12,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10">

          {/* LEFT IMAGE */}
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-[500px] rounded-2xl object-cover"
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <span className="text-sm uppercase tracking-wide text-indigo-600 font-medium mb-2">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-1 mb-4">

              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
              <Star
                size={18}
                className="text-gray-300"
              />

              <span className="text-sm text-gray-500 ml-2">
                (4.0 Reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.desc}
            </p>

            {/* Price */}
            <h2 className="text-4xl font-bold text-indigo-600 mb-4">
              ${product.price}
            </h2>

            {/* Stock */}
            <p className="text-green-600 font-medium mb-6">
              In Stock ({product.stock} available)
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">

              <button
                disabled={qty <= 1}
                onClick={() => setQty(qty - 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
              >
                -
              </button>

              <span className="text-lg font-semibold">
                {qty}
              </span>

              <button
                disabled={qty >= product.stock}
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Add To Cart */}
              <button
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition text-white px-6 py-4 rounded-xl w-full font-medium"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition px-6 py-4 rounded-xl w-full font-medium"
              >
                <Heart size={20} />
                Wishlist
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}