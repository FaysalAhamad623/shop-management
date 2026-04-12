import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleWishlist, wishlist } from "../../store/wishlistStore";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
export default function Home() {
  const navigate = useNavigate();

  // 🔥 Context cart
  const { addToCart } = useCart();

  const [products] = useState([
    {
      id: 1,
      name: "T-Shirt",
      price: 20,
      category: "Clothing",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Burger",
      price: 5,
      category: "Food",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Headphone",
      price: 60,
      category: "Electronics",
      image: "https://via.placeholder.com/200",
    },
  ]);

  const [filter, setFilter] = useState("");

  const filteredProducts = products.filter(
    (p) => filter === "" || p.category === filter
  );
  const { showToast } = useToast();
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔥 Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛍️ Our Products
      </h1>

      {/* 🔥 Category Filter */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setFilter("")}
          className="bg-gray-300 px-4 py-1 rounded"
        >
          All
        </button>

        <button
          onClick={() => setFilter("Clothing")}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Clothing
        </button>

        <button
          onClick={() => setFilter("Food")}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Food
        </button>

        <button
          onClick={() => setFilter("Electronics")}
          className="bg-purple-500 text-white px-4 py-1 rounded"
        >
          Electronics
        </button>
      </div>

      {/* 🔥 Product Grid */}
      <div className="grid grid-cols-3 gap-6">

        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Image */}
            <img
              src={p.image}
              className="w-full h-40 object-cover rounded-t-xl"
            />

            {/* Info */}
            <div className="p-4">
              <h2 className="font-bold text-lg">{p.name}</h2>
              <p className="text-gray-500">{p.category}</p>

              {/* 🔥 Price + Buttons */}
              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-blue-500">
                  ${p.price}
                </span>

                <div className="flex items-center gap-3  text-white px-3 py-1 rounded-lg  hover:scale-105 transition">

                  {/* ❤️ Wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p);
                    }}
                    className=" hover:bg-blue-900 px-2 py-1 rounded-lg transition"
                  >
                    {wishlist.find((x) => x.id === p.id) ? "❤️" : "🤍"}
                  </button>

                  {/* 🛒 Cart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                  >
                    🛒 Add
                  </button>

                </div>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}