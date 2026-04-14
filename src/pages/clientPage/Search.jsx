import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search() {

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q") || "";

  const [search, setSearch] = useState(query);

  const products = [
    { id: 1, name: "T-Shirt", category: "Clothing", price: 20 },
    { id: 2, name: "Burger", category: "Food", price: 5 },
    { id: 3, name: "Headphone", category: "Electronics", price: 60 },
  ];

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        🔍 Search Results
      </h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded w-full mb-4"
      />

      {filtered.length === 0 ? (
        <p>No products found 😢</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="bg-white p-4 rounded shadow cursor-pointer"
            >
              <h2 className="font-bold">{p.name}</h2>
              <p>{p.category}</p>
              <p>${p.price}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}