import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateCoupon } from "../../store/couponStore";

export default function Cart() {

  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  // 🔥 Coupon state
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  // 🔥 Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = total > 50 ? 0 : 5;
  const tax = total * 0.05;

  const finalTotal = total + delivery + tax - discount;

  // 🔥 Apply coupon
  const applyCoupon = () => {
    const res = validateCoupon(code, total);

    if (res.error) {
      setError(res.error);
      setDiscount(0);
      return;
    }

    setError("");

    if (res.coupon.type === "percent") {
      setDiscount((total * res.coupon.value) / 100);
    } else {
      setDiscount(res.coupon.value);
    }
  };

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
                    onClick={() => decreaseQty(item.id)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    -
                  </button>

                  <span className="font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-green-500 text-white px-2 rounded"
                  >
                    +
                  </button>

                </div>

                {/* 🔥 Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          {/* 💰 Summary */}
          <div className="bg-white p-5 rounded-xl shadow h-fit sticky top-20">

            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            {/* 🔥 Coupon */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border p-2 w-full rounded mb-2"
              />
              <div className="bg-yellow-100 p-3 rounded mb-3 text-sm">
  🎁 Available Offers:
  <br />
  <span className="font-semibold">SAVE10</span> - 10% OFF  
  <br />
  <span className="font-semibold">FLAT5</span> - $5 OFF  
</div>

              <button
                onClick={applyCoupon}
                className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600"
              >
                Apply Coupon
              </button>

              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}

              {discount > 0 && (
                <p className="text-green-600 text-sm mt-1">
                  Discount applied: -${discount.toFixed(2)}
                </p>
              )}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>

            {/* Delivery */}
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span>${delivery}</span>
            </div>

            {/* Tax */}
            <div className="flex justify-between mb-2">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            {/* Discount */}
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>

            <hr className="my-3" />

            {/* Total */}
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>

          </div>

        </div>
      )}

    </div>
  );
}