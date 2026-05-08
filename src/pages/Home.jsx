import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= FETCH BOTH =================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const [fakeRes, mongoRes] = await Promise.all([
        axios.get("https://fakestoreapi.com/products"),
        axios.get("http://localhost:5000/products"),
      ]);

      const fakeProducts = fakeRes.data || [];
      const mongoProducts = mongoRes.data?.product || [];

      // ================= NORMALIZE FAKE =================
      const fake = fakeProducts.map((p) => ({
        id: `fake-${p.id}`,
        name: p.title,
        price: p.price,
        image: p.image,
        description: p.description,
        source: "fake",
      }));

      // ================= NORMALIZE MONGO =================
      const mongo = mongoProducts.map((p) => ({
        id: p._id,
        name: p.name,
        price: p.price,
        image: p.image
          ? `http://localhost:5000${p.image}`   // ✅ FIX IMAGE HERE
          : "/placeholder.png",
        description: p.description,
        source: "mongo",
      }));

      setProducts([...mongo, ...fake]);

    } catch (err) {
      console.log(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTER + SORT =================
  const filtered = products
    .filter((p) =>
      (p.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "az") return a.name.localeCompare(b.name);
      return 0;
    });

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-medium">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">
        Products
      </h1>

      {/* SEARCH + SORT */}
      <div className="flex gap-3 mb-6">

        <input
          className="border p-2 w-full"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="az">Name: A → Z</option>
        </select>

      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found
          </p>
        )}

      </div>

    </div>
  );
}