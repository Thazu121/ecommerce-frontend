export default function OrderCard({
  id,
  status,
  date,
  amount,
  images = [],
  actions = []
}) {
  return (
    <div className="bg-white rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition">
      
      {/* Left Content */}
      <div className="flex-grow space-y-4">
        
        {/* Header */}
        <div className="flex justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-gray-500">Order Number</p>
            <h3 className="text-lg font-semibold">{id}</h3>
          </div>

          <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
            {status}
          </span>
        </div>

        {/* Info */}
        <div className="flex gap-8 flex-wrap">
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p>{date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold">{amount}</p>
          </div>
        </div>

        {/* Images */}
        <div className="flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-20 h-20 rounded-lg object-cover"
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 w-full md:w-auto">
        {actions.map((btn, i) => (
          <button
            key={i}
            className={`px-6 py-2 rounded-lg ${btn.primary
              ? "bg-primary text-white"
              : "border text-gray-600"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}