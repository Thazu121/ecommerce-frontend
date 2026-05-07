export const normalizeProduct = (p, source) => {
  return {
    id: p._id || p.id,
    _id: p._id || p.id,

    name: p.name || p.title,
    description: p.description || p.desc,

    price: p.price,
    image: p.image || "https://via.placeholder.com/300",
    category: p.category,

    source, // "fake" | "db"
  };
};