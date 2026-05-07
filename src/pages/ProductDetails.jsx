import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaShoppingCart } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";

export default function ProductDetails() {

  const { productId } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {

    dispatch(addToCart(product));
  };

  // =========================
  // BUY NOW
  // =========================
  const handleBuyNow = () => {

    // ADD PRODUCT TO CART
    dispatch(addToCart(product));

    // GO TO CHECKOUT
    navigate("/checkout");
  };

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );

        setProduct(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

    fetchProduct();

  }, [productId]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* ========================= */}
        {/* IMAGE */}
        {/* ========================= */}
        <div className="bg-zinc-900 rounded-2xl p-6 flex items-center justify-center">

          <img
            src={product.image}
            alt={product.title}
            className="h-[400px] object-contain"
          />

        </div>

        {/* ========================= */}
        {/* INFO */}
        {/* ========================= */}
        <div>

          {/* CATEGORY */}
          <p className="text-purple-400 uppercase mb-2">
            {product.category}
          </p>

          {/* TITLE */}
          <h1 className="text-4xl font-bold mb-4">
            {product.title}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-2 mb-4">

            <FaStar className="text-yellow-400" />

            <span>
              {product.rating?.rate} Rating
            </span>

            <span className="text-zinc-400">
              ({product.rating?.count} Reviews)
            </span>

          </div>

          {/* PRICE */}
          <h2 className="text-4xl font-bold text-purple-500 mb-6">
            ₹ {product.price}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-zinc-300 leading-7 mb-8">
            {product.description}
          </p>

          {/* ========================= */}
          {/* BUTTONS */}
          {/* ========================= */}
          <div className="flex flex-col sm:flex-row gap-4">

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
            >

              <FaShoppingCart />

              Add To Cart

            </button>

            {/* BUY NOW */}
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