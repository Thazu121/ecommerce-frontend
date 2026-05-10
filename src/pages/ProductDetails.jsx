import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";

export default function ProductDetails() {

  const { productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleAddToCart = () => {

    dispatch(addToCart(product));

    alert("Added to cart");
  };


  const handleBuyNow = () => {

    dispatch(addToCart(product));

    navigate("/cart");
  };

  
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);

        let finalProduct = null;

        try {

          const mongoRes = await axios.get(
            `https://ecommerce-backendport-5000-mongo-uri.onrender.com/products/${productId}`
          );

          console.log("Mongo Product:", mongoRes.data);

          const p =
            mongoRes.data.product ||
            mongoRes.data;

          if (p) {

            finalProduct = {
              _id: p._id,
              title: p.name || p.title,
              price: p.price,
              description: p.description,
              category: p.category,
              image: p.image?.startsWith("http")
                ? p.image
                : `https://ecommerce-backendport-5000-mongo-uri.onrender.com${p.image}`,
              source: "mongo",
            };
          }

        } catch (err) {

          console.log(
            "Mongo product not found"
          );
        }

      
        if (!finalProduct) {

          const fakeId =
            productId.replace("fake-", "");

          const fakeRes = await axios.get(
            `https://fakestoreapi.com/products/${fakeId}`
          );

          const p = fakeRes.data;

          finalProduct = {
            _id: `fake-${p.id}`,
            title: p.title,
            price: p.price,
            description: p.description,
            category: p.category,
            image: p.image,
            rating: p.rating,
            source: "fake",
          };
        }

        setProduct(finalProduct);

      } catch (err) {

        console.log(err);

        setProduct(null);

      } finally {

        setLoading(false);
      }
    };

    fetchProduct();

  }, [productId]);

  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Loading Product...
      </div>
    );
  }


  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-zinc-900 rounded-2xl p-6 flex items-center justify-center">

          <img
            src={product.image}
            alt={product.title}
            className="h-[400px] object-contain"
          />

        </div>

        <div>

          <p className="text-purple-400 uppercase mb-2">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mb-4">
            {product.title}
          </h1>

          {product.rating && (
            <div className="flex items-center gap-2 mb-4">

              <FaStar className="text-yellow-400" />

              <span>
                {product.rating.rate}
              </span>

              <span className="text-zinc-400">
                ({product.rating.count} Reviews)
              </span>

            </div>
          )}

          <h2 className="text-4xl font-bold text-purple-500 mb-6">
            ₹ {product.price}
          </h2>

          <p className="text-zinc-300 leading-7 mb-8">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">

            <button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-semibold transition"
            >
              Add To Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="border border-purple-600 hover:bg-purple-600 px-8 py-3 rounded-xl font-semibold transition"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}