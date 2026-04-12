import { useState } from "react";

import { addToCart } from "../../store/cartStore";
export default function Home() {

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Title */}
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
            className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
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

              <button
  onClick={() => addToCart(p)}
  className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
>
  Add to Cart
</button>
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}