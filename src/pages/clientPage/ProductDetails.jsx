import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // 🔥 IMPORTANT
import { getProducts } from "../../store/productStore";

export default function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart(); // 🔥 FIX (store na, context use korte hobe)

  const products = getProducts();

  // 🔥 SAFE FIND
  const product = products.find(
    (p) => p.id.toString() === id
  );

  if (!product) {
    return <h2 className="p-6">Product not found ❌</h2>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">

        {/* 🔥 Image with better fit */}
        <div className="relative w-full h-80 bg-gray-100 rounded overflow-hidden">
          <img
            src={product.image}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-2">
            {product.category}
          </p>

          <p className="text-xl text-blue-500 font-bold mb-4">
            ${product.price}
          </p>

          <p className="mb-4 text-gray-600">
            {product.desc || "No description available"}
          </p>

          {/* 🔥 FIXED BUTTON */}
          <button
            onClick={() => {
              addToCart(product);
            }}
            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>

      </div>

    </div>
  );
}