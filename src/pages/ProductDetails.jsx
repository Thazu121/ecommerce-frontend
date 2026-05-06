import { useState } from "react";

export default function ProductDetails() {
  const [qty, setQty] = useState(1);

  const product = {
    title: "Lumina Essence Lamp",
    price: 129,
    image: "https://via.placeholder.com/400",
    desc: "Premium minimalist lamp for modern homes",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT IMAGE */}
        <div>
          <img
            src={product.image}
            className="w-full rounded-xl"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-gray-500 mb-6">
            {product.desc}
          </p>

          <h2 className="text-2xl text-indigo-600 mb-6">
            ${product.price}
          </h2>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setQty(qty - 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          {/* BUTTON */}
          <button className="bg-indigo-600 text-white px-6 py-3 rounded w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}