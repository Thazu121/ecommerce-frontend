import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      const data = Array.isArray(res.data.product)
        ? res.data.product
        : res.data.products || [];

      setProducts(data);

    } catch (err) {
      console.log(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    setForm({ ...form, image: file });

    // preview image
    setPreview(URL.createObjectURL(file));
  };

  const handleCreate = async () => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      await API.post("/products", formData);

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
      });

      setPreview(null);
      fetchProducts();

    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description,
      image: null,
    });

    setPreview(
      p.image ? `http://localhost:5000${p.image}` : null
    );

    setEditId(p._id);
  };

  const handleUpdate = async () => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      await API.put(`/products/${editId}`, formData);

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
      });

      setPreview(null);
      setEditId(null);
      fetchProducts();

    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        🛠️ Products Admin Panel
      </h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-3">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 w-full rounded"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-full rounded"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 w-full rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="border p-2 w-full rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover mt-2 rounded"
          />
        )}

        <button
          onClick={editId ? handleUpdate : handleCreate}
          disabled={submitting}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">

          {products.map((p) => (
            <div key={p._id} className="bg-white p-4 shadow rounded">

              <img
                src={
                  p.image
                    ? `http://localhost:5000${p.image}`
                    : "/placeholder.png"
                }
                alt={p.name}
                className="w-full h-40 object-cover rounded mb-2"
              />

              <h2 className="font-bold">{p.name}</h2>
              <p>₹{p.price}</p>
              <p className="text-sm text-gray-600">{p.category}</p>
              <p className="text-sm text-gray-500">{p.description}</p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}