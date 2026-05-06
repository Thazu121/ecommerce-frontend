export default function OrderSummary() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">

      <h2 className="text-xl font-semibold mb-6">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$648</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>$52</span>
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-4">
          <span>Total</span>
          <span>$700</span>
        </div>

      </div>

      <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-full hover:opacity-90">
        Checkout
      </button>
    </div>
  );
}