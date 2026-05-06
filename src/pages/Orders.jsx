import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";
import Footer from "../components/Footer";

export default function Orders() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-500 mb-8">
          Track and review your purchases
        </p>

        <div className="space-y-6">

          <OrderCard
            id="#LX-89421"
            status="Shipped"
            date="Oct 24, 2023"
            amount="$1240"
            images={[
              "https://via.placeholder.com/100",
              "https://via.placeholder.com/100"
            ]}
            actions={[
              { label: "Track Order", primary: true },
              { label: "Order Details" }
            ]}
          />

          <OrderCard
            id="#LX-89304"
            status="Processing"
            date="Oct 26, 2023"
            amount="$450"
            images={[
              "https://via.placeholder.com/100"
            ]}
            actions={[
              { label: "Cancel Order" },
              { label: "Order Details" }
            ]}
          />

          <OrderCard
            id="#LX-88129"
            status="Delivered"
            date="Oct 12, 2023"
            amount="$2100"
            images={[
              "https://via.placeholder.com/100",
              "https://via.placeholder.com/100",
              "https://via.placeholder.com/100"
            ]}
            actions={[
              { label: "Buy Again", primary: true },
              { label: "Write Review" }
            ]}
          />

        </div>
      </main>

      <Footer />

    </div>
  );
}