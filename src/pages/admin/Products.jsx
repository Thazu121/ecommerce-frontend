import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  // ======================
  // GET PRODUCTS (FIXED)
  // ======================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      console.log("API RESPONSE:", res.data); // DEBUG

      // ✅ SAFE FIX (prevents map error)
      const data =
        Array.isArray(res.data)
          ? res.data
          : res.data.products ||
            res.data.data ||
            [];

      setProducts(data);

    } catch (err) {
      console.log(err);
      setProducts([]); // fallback safety
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // CREATE PRODUCT
  // ======================
  const handleCreate = async () => {
    if (!form.title || !form.price || !form.image) return;

    try {
      setSubmitting(true);

      await API.post("/products", form);

      setForm({ title: "", price: "", image: "" });

      fetchProducts();

    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  // ======================
  // DELETE PRODUCT
  // ======================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // EDIT PRODUCT
  // ======================
  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      image: product.image,
    });

    setEditId(product._id);
  };

  // ======================
  // UPDATE PRODUCT
  // ======================
  const handleUpdate = async () => {
    try {
      setSubmitting(true);

      await API.put(`/products/${editId}`, form);

      setForm({ title: "", price: "", image: "" });
      setEditId(null);

      fetchProducts();

    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        🛠️ Products Admin Panel
      </h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="border p-2 rounded w-full"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded w-full"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 rounded w-full"
          />

        </div>

        <button
          disabled={submitting}
          onClick={editId ? handleUpdate : handleCreate}
          className={`mt-4 w-full md:w-auto px-5 py-2 rounded text-white transition ${
            editId ? "bg-green-600" : "bg-blue-600"
          } ${submitting ? "opacity-50" : "hover:opacity-90"}`}
        >
          {submitting
            ? "Processing..."
            : editId
            ? "Update Product"
            : "Add Product"}
        </button>

      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <p className="text-gray-500 text-center">
          Loading products...
        </p>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && products.length === 0 && (
        <p className="text-gray-500 text-center">
          No products found
        </p>
      )}

      {/* ================= PRODUCT LIST ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {Array.isArray(products) &&
          products.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-xl shadow flex flex-col gap-3 hover:shadow-lg transition"
            >

              {/* IMAGE */}
              <img
                src={p.image}
                className="w-full h-40 object-cover rounded"
              />

              {/* INFO */}
              <div>
                <h2 className="font-semibold text-lg line-clamp-1">
                  {p.title}
                </h2>

                <p className="text-gray-600 font-medium">
                  ₹{p.price}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">

                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}
      </div>

    </div>
  );
}