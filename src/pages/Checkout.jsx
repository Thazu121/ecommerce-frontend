import Navbar from "../components/Navbar";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-[800px] mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <form className="bg-white p-6 rounded-lg shadow space-y-4">
          <input placeholder="Full Name" className="w-full border p-2 rounded" />
          <input placeholder="Address" className="w-full border p-2 rounded" />
          <input placeholder="City" className="w-full border p-2 rounded" />
          <input placeholder="Card Number" className="w-full border p-2 rounded" />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}