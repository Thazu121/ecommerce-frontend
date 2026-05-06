import Navbar from "../components/Navbar";
import CartList from "../components/CartList";
import OrderSummary from "../components/OrderSummary";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Your Shopping Bag
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Review your items and proceed to checkout.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-8">
            <CartList />
          </div>

          <div className="lg:col-span-4">
            <OrderSummary />
          </div>

        </div>

      </main>

      <footer className="bg-white border-t text-center py-6 text-sm text-gray-500">
        © 2024 LUXE
      </footer>

    </div>
  );
}