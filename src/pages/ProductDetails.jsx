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

  // ================= ADD TO CART =================
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  // ================= FETCH =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        let finalProduct = null;

        // ================= MONGO FIRST =================
        try {
          const mongoRes = await axios.get(
            `http://localhost:5000/products/${productId}`
          );

          const p = mongoRes.data.product;

          if (p) {
            finalProduct = {
              id: p._id,
              name: p.name,
              price: p.price,
              description: p.description,
              category: p.category,
              image: p.image
                ? `http://localhost:5000${p.image}` // ✅ FIX IMAGE
                : "/placeholder.png",
              source: "mongo",
            };
          }
        } catch (err) {
          console.log("Mongo not found, fallback to fake");
        }

        // ================= FAKE API FALLBACK =================
        if (!finalProduct) {
          const fakeRes = await axios.get(
            `https://fakestoreapi.com/products/${productId}`
          );

          const p = fakeRes.data;

          finalProduct = {
            id: p.id,
            name: p.title,
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

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  // ================= NOT FOUND =================
  if (!product) {
    return (
      <div className="text-center text-white mt-10">
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
            alt={product.name}
            className="h-[400px] object-contain"
          />
        </div>

        {/* INFO */}
        <div>

          <p className="text-purple-400 mb-2">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          {/* FAKE API RATING */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <FaStar className="text-yellow-400" />
              <span>{product.rating.rate}</span>
              <span className="text-zinc-400">
                ({product.rating.count})
              </span>
            </div>
          )}

          <h2 className="text-3xl text-purple-500 mb-4">
            ₹ {product.price}
          </h2>

          <p className="text-zinc-300 mb-8">
            {product.description}
          </p>

          <div className="flex gap-4">

            <button
              onClick={handleAddToCart}
              className="bg-purple-600 px-6 py-3 rounded"
            >
              Add To Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="border border-purple-600 px-6 py-3 rounded"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}