import { useState } from "react";
import { categories } from "../store/categoryStore";

export default function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "T-Shirt",
      price: 20,
      quantity: 3,
      category: "Clothing",
      image: "https://via.placeholder.com/100",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
  });

  // 🔥 NEW CATEGORY STATES
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      setProducts(
        products.map((p) =>
          p.id === editing ? { ...formData, id: editing } : p
        )
      );
      setEditing(null);
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }

    setFormData({
      name: "",
      price: "",
      quantity: "",
      category: "",
      image: "",
    });

    setShowForm(false);
  };

  // Edit
  const handleEdit = (product) => {
    setFormData(product);
    setEditing(product.id);
    setShowForm(true);
  };

  // Delete
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Filter
  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "" || p.category === categoryFilter)
    );
  });

  return (
    <div className="p-6">

      {/* Top */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 w-full rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>

          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id} className="text-center border-t">
              <td className="p-2">
                <img src={p.image} className="w-12 h-12 mx-auto" />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>

              <td className="space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-400 px-2 py-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-80">

            <h2 className="mb-3 font-bold">
              {editing ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Name"
                className="border p-2 w-full mb-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Price"
                className="border p-2 w-full mb-2"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Quantity"
                className="border p-2 w-full mb-2"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />

              {/* 🔥 CATEGORY DROPDOWN */}
              <select
                className="border p-2 w-full mb-2"
                value={formData.category}
                onChange={(e) => {
                  if (e.target.value === "add_new") {
                    setShowNewCategory(true);
                  } else {
                    setFormData({ ...formData, category: e.target.value });
                    setShowNewCategory(false);
                  }
                }}
              >
                <option value="">Select Category</option>

                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}

                <option value="add_new">➕ Add New Category</option>
              </select>

              {/* 🔥 NEW CATEGORY INPUT */}
              {showNewCategory && (
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="New Category"
                    className="border p-2 w-full mb-2"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />

                  <button
                    type="button"
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      if (!newCategory) return;

                      categories.push(newCategory);
                      setFormData({ ...formData, category: newCategory });
                      setNewCategory("");
                      setShowNewCategory(false);
                    }}
                  >
                    Add Category
                  </button>
                </div>
              )}

              <input
                type="text"
                placeholder="Image URL"
                className="border p-2 w-full mb-2"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />

              <button className="bg-green-500 text-white px-3 py-1 w-full">
                Save
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}