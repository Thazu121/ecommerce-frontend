import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { PackageSearch } from "lucide-react";

export default function Orders() {
  const { orders } = useSelector((state) => state.orders);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* MAIN */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Track and review your recent purchases
          </p>
        </div>

        {/* EMPTY STATE */}
        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <PackageSearch
              size={70}
              className="mx-auto text-gray-300 mb-4"
            />

            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Orders Yet
            </h2>

            <p className="text-gray-500">
              Your placed orders will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order.id || order._id}
                className="bg-white rounded-2xl shadow-sm p-6 space-y-5"
              >

                {/* ORDER HEADER */}
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">
                    Order #{order.id || order._id}
                  </h2>

                  <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {order.status || "Processing"}
                  </span>
                </div>

                {/* DATE */}
                <p className="text-sm text-gray-500">
                  {new Date(
                    order.date || order.createdAt
                  ).toDateString()}
                </p>

                {/* ITEMS */}
                <div className="space-y-3">
                  {(order.items || order.products || []).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 border rounded-xl p-3"
                    >

                      {/* IMAGE */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      {/* INFO */}
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">
                          {item.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>

                      {/* PRICE */}
                      <p className="font-semibold text-purple-600">
                        ₹
                        {(item.price || 0) *
                          (item.quantity || 1)}
                      </p>

                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="flex justify-between border-t pt-4 font-bold">
                  <span>Total</span>

                  <span className="text-purple-600">
                    ₹{order.total || order.totalPrice}
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}