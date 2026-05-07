import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ GET PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products"
      );

      setProducts(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ ADD PRODUCT TO FAKESTORE API
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const newProduct = {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        image: form.image,
        category: form.category,
      };

      const res = await axios.post(
        "https://fakestoreapi.com/products",
        newProduct
      );

      console.log("Added:", res.data);

      // add instantly to UI
      setProducts([res.data, ...products]);

      // clear form
      setForm({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // ✅ DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://fakestoreapi.com/products/${id}`
      );

      setProducts(
        products.filter((item) => item.id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">
          Admin Product Management
        </h1>

        <p className="text-gray-500 mt-1">
          Add / Delete Products using FakeStore API
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* ADD PRODUCT */}
        <div className="bg-white p-6 rounded-2xl shadow h-fit">

          <h2 className="text-xl font-semibold mb-5">
            Add Product
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              rows="4"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg resize-none"
              required
            />

            <button
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg transition"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        {/* PRODUCT LIST */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow p-4 flex flex-col"
            >

              <img
                src={product.image}
                alt={product.title}
                className="h-48 object-contain mb-4"
              />

              <h3 className="font-semibold line-clamp-2">
                {product.title}
              </h3>

              <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                {product.description}
              </p>

              <div className="mt-auto pt-4">

                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-indigo-600">
                    ₹{product.price}
                  </span>

                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="w-full bg-red-500 hover:bg-red-400 text-white py-2 rounded-lg transition"
                >
                  Delete Product
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}