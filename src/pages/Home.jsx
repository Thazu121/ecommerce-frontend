import ProductCard from "../components/ProductCard";

export default function Home() {
  const products = [
    {
      id: 1,
      title: "Watch",
      price: 99,
      image: "https://via.placeholder.com/200",
      desc: "Premium watch",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}