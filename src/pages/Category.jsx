import { useState } from "react";
import {
  categories,
  addCategory,
  deleteCategory,
} from "../store/categoryStore";

export default function Category() {
  const [newCategory, setNewCategory] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleAdd = () => {
    if (!newCategory) return;

    addCategory(newCategory);
    setNewCategory("");
    setRefresh(!refresh); // UI update
  };

  const handleDelete = (cat) => {
    deleteCategory(cat);
    setRefresh(!refresh);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>

      {/* Add Category */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="New category..."
          className="border p-2 rounded w-full"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Category List */}
      <div className="bg-white p-4 rounded shadow">
        {categories.map((cat, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{cat}</span>

            <button
              onClick={() => handleDelete(cat)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}