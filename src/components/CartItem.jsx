export default function CartItem() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 shadow-sm">

      <img
        src="https://via.placeholder.com/150"
        className="w-full sm:w-32 h-32 object-cover rounded-lg"
      />

      <div className="flex flex-col justify-between flex-1">

        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-lg">Product Name</h3>
            <p className="text-sm text-gray-500">Variant</p>
          </div>
          <span className="font-bold text-indigo-600">$249</span>
        </div>

        <div className="flex justify-between items-center mt-4">

          <div className="flex items-center border rounded-full px-3 py-1">
            <button>-</button>
            <span className="px-3">1</span>
            <button>+</button>
          </div>

          <button className="text-red-500 text-sm">
            Remove
          </button>

        </div>
      </div>
    </div>
  );
}