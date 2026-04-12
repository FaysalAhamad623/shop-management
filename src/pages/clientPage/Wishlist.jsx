import { useState, useEffect } from "react";
import { wishlist, toggleWishlist } from "../../store/wishlistStore";

export default function Wishlist() {

  const [items, setItems] = useState([]);

  // 🔥 Load wishlist
  useEffect(() => {
    setItems([...wishlist]);
  }, []);

  // 🔥 Remove handler
  const handleRemove = (product) => {
    toggleWishlist(product); // remove via toggle
    setItems([...wishlist]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        ❤️ My Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="text-center mt-24">
          <p className="text-5xl mb-3">💔</p>
          <h2 className="text-xl text-gray-500">
            Your wishlist is empty
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Start adding your favorite products!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">

          {items.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
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

                <div className="flex justify-between items-center mt-3">
                  <span className="text-blue-500 font-bold">
                    ${p.price}
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(p)}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}