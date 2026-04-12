import { useState } from "react";

export default function Customer() {
  const [customers] = useState([
    {
      id: 1,
      name: "Faysal",
      phone: "01700000000",
      email: "faysal@gmail.com",
      orders: 5,
      spent: 500,
    },
    {
      id: 2,
      name: "Rahim",
      phone: "01800000000",
      email: "rahim@gmail.com",
      orders: 3,
      spent: 300,
    },
    {
      id: 3,
      name: "Karim",
      phone: "01900000000",
      email: "karim@gmail.com",
      orders: 2,
      spent: 150,
    },
  ]);

  const [search, setSearch] = useState("");

  // 🔥 Search
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search customer..."
        className="border p-2 mb-4 w-full rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Total Spent</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((c) => (
            <tr key={c.id} className="text-center border-t">
              <td className="p-2">{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.orders}</td>
              <td>${c.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}