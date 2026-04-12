import { useLocation } from "react-router-dom";

export default function Search() {

  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get("q") || "";

  // 🔥 same demo data
  const products = [
    { id: 1, name: "T-Shirt", category: "Clothing", price: 20 },
    { id: 2, name: "Burger", category: "Food", price: 5 },
    { id: 3, name: "Headphone", category: "Electronics", price: 60 },
  ];

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        🔍 Search: "{keyword}"
      </h1>

      {results.length === 0 ? (
        <p>No products found 😢</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">

          {results.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold">{p.name}</h2>
              <p>{p.category}</p>
              <p className="text-blue-500">${p.price}</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}