import API from "../api/api";
import { normalizeProduct } from "../utils/normalizeProduct";

// 🔵 Fake Store API
export const fetchFakeProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return data.map((p) =>
    normalizeProduct(
      {
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        image: p.image,
        category: p.category,
      },
      "fake"
    )
  );
};

// 🟢 MongoDB Products
export const fetchDbProducts = async () => {
  const res = await API.get("/products");

  return res.data.products.map((p) =>
    normalizeProduct(p, "db")
  );
};

// 🔥 FINAL MERGED LIST
export const fetchAllProducts = async () => {
  const [fake, db] = await Promise.all([
    fetchFakeProducts(),
    fetchDbProducts(),
  ]);

  return [...fake, ...db];
};