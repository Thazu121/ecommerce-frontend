import { useSelector } from "react-redux";

import OrderCard from "../components/OrderCard";
import Footer from "../components/Footer";

import { PackageSearch } from "lucide-react";

export default function Orders() {

  const { orders } = useSelector(
    (state) => state.orders
  );

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

        {/* EMPTY */}
        {orders.length === 0 ? (

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

              <OrderCard
                key={order._id}

                id={`#${order._id}`}

                status={
                  order.status || "pending"
                }

                date={new Date(
                  order.createdAt
                ).toDateString()}

                amount={`₹${order.totalPrice}`}

                images={order.products.map(
                  (item) => item.image
                )}

                actions={[
                  {
                    label: "Track Order",
                    primary: true,
                  },
                  {
                    label: "Order Details",
                  },
                ]}
              />

            ))}

          </div>
        )}

      </main>

      <Footer />

    </div>
  );
}