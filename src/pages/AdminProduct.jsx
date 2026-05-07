import Navbar from "../components/Navbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/features/productSlice";

export default function AddProduct() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.title.trim()) err.title = "Title required";
    if (!form.price || form.price <= 0) err.price = "Valid price required";
    if (!form.image.trim()) err.image = "Image URL required";
    if (!form.category.trim()) err.category = "Category required";
    if (!form.description.trim()) err.description = "Description required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    const newProduct = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
    };

    dispatch(addProduct(newProduct));

    setSuccess("Product added successfully!");

    setForm({
      title: "",
      price: "",
      image: "",
      category: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Admin - Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          {success && (
            <p className="text-green-600 text-sm">{success}</p>
          )}

          {/* Title */}
          <div>
            <input
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-3 rounded h-28"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description}
              </p>
            )}
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}