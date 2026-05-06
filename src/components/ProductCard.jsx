export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
      <img
        src={product.image}
        className="h-60 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-gray-500 text-sm">{product.desc}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-indigo-600 font-bold">
            ${product.price}
          </span>

          <button className="bg-indigo-600 text-white px-3 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}