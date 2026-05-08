import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import API from "../api/api";
import Footer from "../components/Footer";
import { PackageSearch } from "lucide-react";
import { setOrders } from "../redux/features/orderSlice";

const getImage = (img) => {
  if (!img) return "/placeholder.png";
  if (img.startsWith("http")) return img;
  return `http://localhost:5000${img}`;
};

export default function Orders() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  // ================= FETCH ORDERS =================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/order/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("ORDERS FROM BACKEND:", res.data);

        // ✅ FIXED: extract orders properly
        dispatch(setOrders(res.data.orders));

      } catch (err) {
        console.log("FETCH ORDERS ERROR:", err.response?.data || err.message);
      }
    };

    fetchOrders();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">

        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {!orders || orders.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl">
            <PackageSearch size={60} className="mx-auto text-gray-400" />
            <p>No Orders Yet</p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div key={order._id} className="bg-white p-5 rounded-xl shadow">

                {/* HEADER */}
                <div className="flex justify-between">
                  <h2 className="font-semibold">
                    Order #{order._id}
                  </h2>
                  <span className="text-sm text-green-600">
                    {order.status || "Processing"}
                  </span>
                </div>

                <p className="text-gray-500 text-sm">
                  {new Date(order.createdAt).toDateString()}
                </p>

                {/* PRODUCTS */}
                <div className="mt-4 space-y-3">

                  {order.products.map((item, i) => (
                    <div key={i} className="flex gap-4 border p-3 rounded">

                      <img
                        src={getImage(item.image)}
                        className="w-16 h-16 object-cover rounded"
                        alt={item.title}
                      />

                      <div className="flex-1">
                        <p className="font-medium">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>
                  ))}

                </div>

                {/* TOTAL */}
                <div className="text-right font-bold mt-4">
                  Total: ₹{order.totalPrice}
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