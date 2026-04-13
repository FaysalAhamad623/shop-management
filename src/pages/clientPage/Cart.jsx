import { useCart } from "../../context/CartContext";

export default function Cart() {

  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        <div className="space-y-4">

          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>${item.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}