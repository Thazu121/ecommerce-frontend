import {
  Package,
  CalendarDays,
  CreditCard,
  Truck,
  CheckCircle,
} from "lucide-react";

export default function OrderCard({
  id,
  status,
  date,
  amount,
  images = [],
  actions = [],
}) {

  // ✅ Backend Status Support
  const statusStyles = {
    pending:
      "bg-yellow-100 text-yellow-700",

    shipped:
      "bg-blue-100 text-blue-700",

    delivered:
      "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">

      {/* TOP */}
      <div className="p-6 border-b">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* LEFT */}
          <div>

            <div className="flex items-center gap-2 mb-2">

              <Package
                size={20}
                className="text-indigo-600"
              />

              <h3 className="text-xl font-bold text-gray-800">
                {id}
              </h3>

            </div>

            {/* INFO */}
            <div className="flex flex-wrap gap-5 text-sm text-gray-500 mt-3">

              <div className="flex items-center gap-2">

                <CalendarDays size={16} />

                {date}

              </div>

              <div className="flex items-center gap-2">

                <CreditCard size={16} />

                {amount}

              </div>

            </div>

          </div>

          {/* STATUS */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium w-fit capitalize ${
              statusStyles[status] ||
              "bg-gray-100 text-gray-700"
            }`}
          >

            {status === "delivered" ? (
              <CheckCircle size={16} />
            ) : (
              <Truck size={16} />
            )}

            {status}

          </div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="p-6">

        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Ordered Products
        </h4>

        <div className="flex gap-4 overflow-x-auto pb-2">

          {images.map((img, i) => (

            <div
              key={i}
              className="min-w-[90px] group"
            >

              <img
                src={img}
                alt="product"
                className="w-24 h-24 rounded-xl object-cover border border-gray-200 group-hover:scale-105 transition"
              />

            </div>

          ))}

        </div>

      </div>

      {/* FOOTER */}
      <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">

        {actions.map((btn, i) => (

          <button
            key={i}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${
              btn.primary
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "border border-gray-300 hover:bg-gray-100 text-gray-700"
            }`}
          >

            {btn.label}

          </button>

        ))}

      </div>

    </div>
  );
}