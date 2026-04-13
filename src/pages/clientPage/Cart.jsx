import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
export default function Cart() {

  const { cart, removeFromCart, addToCart } = useCart();
const navigate = useNavigate();
  // 🔥 Decrease quantity
  const decreaseQty = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      item.quantity -= 1;
    }
  };

  // 🔥 Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-xl text-gray-500">
            Your cart is empty 😢
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">

          {/* 🛒 Items */}
          <div className="col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-gray-500">${item.price}</p>
                </div>

                {/* 🔥 Quantity */}
                <div className="flex items-center gap-2">

                  <button
                    onClick={() => decreaseQty(item)}
                    className="bg-gray-300 px-2 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gray-300 px-2 rounded"
                  >
                    +
                  </button>

                </div>

                {/* 🔥 Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          {/* 💰 Summary */}
          <div className="bg-white p-4 rounded-xl shadow h-fit">

            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            <p className="mb-2">
              Items: {cart.length}
            </p>

            <p className="mb-4 font-bold text-lg">
              Total: ${total}
            </p>

            <button
  onClick={() => navigate("/checkout")}
  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
>
  Checkout
</button>

          </div>

        </div>
      )}

    </div>
  );
}