import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        const fakeRes = await axios.get(
          "https://fakestoreapi.com/products"
        );

        let mongoProducts = [];

        try {

          const mongoRes = await axios.get(
            "https://ecommerce-backendport-5000-mongo-uri.onrender.com/products"
          );

          console.log("Mongo Response:", mongoRes.data);

          mongoProducts =
            mongoRes.data.products ||
            mongoRes.data.product ||
            mongoRes.data ||
            [];

        } catch (mongoErr) {

          console.log("Mongo API Error:", mongoErr);

        }

        
        const fakeProducts = fakeRes.data.map((p) => ({
          _id: `fake-${p.id}`,
          title: p.title,
          price: p.price,
          image: p.image,
          description: p.description,
          category: p.category,
          source: "fake",
        }));

      
        const adminProducts = mongoProducts.map((p) => ({
          _id: p._id,
          title: p.name || p.title,
          price: p.price,
          image: p.image?.startsWith("http")
            ? p.image
            : `https://ecommerce-backendport-5000-mongo-uri.onrender.com${p.image}`,
          description: p.description,
          category: p.category,
          source: "mongo",
        }));

        setProducts([
          ...adminProducts,
          ...fakeProducts,
        ]);

      } catch (err) {

        console.log("Fetch Error:", err);

      } finally {

        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  
  const filteredProducts = products
    .filter((product) =>
      product.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {

      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            Explore Products
          </h1>

      

        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border border-gray-300 rounded-2xl px-5 py-4 w-full sm:w-[380px] outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-300"
          >

            <option value="">
              Sort
            </option>

            <option value="low">
              Price Low → High
            </option>

            <option value="high">
              Price High → Low
            </option>

            <option value="az">
              A → Z
            </option>

          </select>

        </div>

      </div>

      {filteredProducts.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      ) : (

        <div className="text-center py-20">

          <h2 className="text-5xl font-bold text-gray-700 mb-4">
            No Products Found
          </h2>

          <p className="text-gray-500 text-xl">
            Try searching another product
          </p>

        </div>

      )}

    </div>
  );
}