import { useEffect, useState } from "react";
import {
  getProducts,
  saveProduct,
  deleteProduct,
  updateProduct,
} from "../store/productStore";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const refresh = () => setProducts(getProducts());

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.category) return;

    if (editing) {
      updateProduct({ ...form, id: editing });
      setEditing(null);
    } else {
      saveProduct({
        ...form,
        id: Date.now(),
      });
    }

    setForm({ name: "", price: "", category: "" });
    refresh();
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditing(p.id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        📦 Product Management
      </h1>

      {/* 🔥 Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-3">

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editing ? "Update Product" : "Add Product"}
        </button>

      </div>

      {/* 🔥 Product List */}
      <div className="space-y-3">

        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >

            <div>
              <h2 className="font-bold">{p.name}</h2>
              <p>${p.price} | {p.category}</p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  deleteProduct(p.id);
                  refresh();
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}