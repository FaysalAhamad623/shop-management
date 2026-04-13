import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toggleWishlist, wishlist } from "../../store/wishlistStore";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

export default function Home() {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);

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

  // 🔥 Loader effect
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const filteredProducts = products.filter(
    (p) => filter === "" || p.category === filter
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛍️ Our Products
      </h1>

      {/* Filter */}
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => setFilter("")} className="bg-gray-300 px-4 py-1 rounded">
          All
        </button>
        <button onClick={() => setFilter("Clothing")} className="bg-blue-500 text-white px-4 py-1 rounded">
          Clothing
        </button>
        <button onClick={() => setFilter("Food")} className="bg-green-500 text-white px-4 py-1 rounded">
          Food
        </button>
        <button onClick={() => setFilter("Electronics")} className="bg-purple-500 text-white px-4 py-1 rounded">
          Electronics
        </button>
      </div>

      {/* 🔥 LOADER */}
      {loading ? (
        <div className="grid grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse">
              <div className="h-40 bg-gray-300 rounded mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
            </div>
          ))}
        </div>
      ) : (

      /* 🔥 PRODUCT GRID */
      <div className="grid grid-cols-3 gap-6">

        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={p.image}
              className="w-full h-40 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg">{p.name}</h2>
              <p className="text-gray-500">{p.category}</p>

              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-blue-500">
                  ${p.price}
                </span>

                <div className="flex gap-2 items-center">

                  {/* ❤️ Wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p);

                      const exist = wishlist.find((x) => x.id === p.id);
                      showToast(
                        exist
                          ? "Removed from wishlist ❌"
                          : "Added to wishlist ❤️"
                      );
                    }}
                    className="text-xl"
                  >
                    {wishlist.find((x) => x.id === p.id)
                      ? "❤️"
                      : "🤍"}
                  </button>

                  {/* 🛒 Cart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                      showToast("Added to cart ✅");
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                  >
                    🛒 Add
                  </button>

                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
      )}

    </div>
  );
}