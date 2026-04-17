import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ open, setOpen }) {

  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* 🔥 Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}

      {/* 🔥 Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-lg
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >

        <div className="p-4 flex justify-between border-b">
          <h2 className="font-bold text-lg">🛒 Cart</h2>
          <button onClick={() => setOpen(false)}>✖</button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto h-[70%]">

          {cart.length === 0 ? (
            <p>Cart is empty 😢</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="border p-2 rounded">

                <p className="font-bold">{item.name}</p>
                <p>${item.price}</p>

                <div className="flex gap-2 items-center mt-1">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-1"
                >
                  Remove
                </button>

              </div>
            ))
          )}

        </div>

        {/* 🔥 Footer */}
        <div className="p-4 border-t">
          <p className="font-bold mb-2">Total: ${total}</p>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/checkout");
            }}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Checkout
          </button>
        </div>

      </div>
    </>
  );
}