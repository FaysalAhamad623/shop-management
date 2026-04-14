import { useParams } from "react-router-dom";
import { getOrders } from "../store/orderStore";

export default function OrderDetails() {

  const { id } = useParams();

  const orders = getOrders();
  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <p className="p-6">Order not found ❌</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        📦 Order Details
      </h1>

      <div className="bg-white p-5 rounded-xl shadow">

        <p><b>Order ID:</b> #{order.id}</p>
        <p><b>Date:</b> {order.date}</p>
        <p><b>Status:</b> {order.status}</p>

        <hr className="my-3" />

        <p><b>Customer:</b> {order.name}</p>
        <p><b>Phone:</b> {order.phone}</p>

        <hr className="my-3" />

        <h2 className="font-bold mb-2">Items:</h2>

        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-1"
          >
            <span>{item.name} x{item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}

        <h3 className="mt-4 font-bold text-lg">
          Total: ${order.total}
        </h3>

      </div>

    </div>
  );
}