import { useEffect, useState } from "react";
import API from "../api/api"

export default function ProductManagement() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    desc: "",
  });

  // 📦 Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🧠 Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ➕ Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/products", form);

      setProducts([res.data, ...products]);

      setForm({
        title: "",
        price: "",
        image: "",
        desc: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑️ Delete Product
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);

      setProducts(
        products.filter((p) => p._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Product Management
        </h1>

        <p className="text-gray-500 text-sm">
          Admin Dashboard
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* FORM */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Add Product
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Product Title"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Description"
              rows="4"
              className="w-full border p-3 rounded-lg"
            />

            <button
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* PRODUCTS */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">

          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >

              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">

                <h3 className="font-semibold text-lg">
                  {product.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {product.desc}
                </p>

                <div className="flex justify-between items-center mt-4">

                  <span className="text-indigo-600 font-bold">
                    ₹{product.price}
                  </span>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}