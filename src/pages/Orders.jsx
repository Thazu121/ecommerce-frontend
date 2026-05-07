import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

export default function Orders() {
  const { orders } = useSelector((state) => state.orders);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-500 mb-8">
          Track and review your purchases
        </p>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                id={`#${order.id}`}
                status="Processing"
                date={new Date(order.date).toDateString()}
                amount={`₹${order.total}`}
                images={order.items.map((i) => i.image)}
                actions={[
                  { label: "Track Order", primary: true },
                  { label: "Order Details" },
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