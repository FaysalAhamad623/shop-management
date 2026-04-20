import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../store/profileStore";

export default function Profile() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const user = getProfile();

    setForm({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
    });
  }, []);

  const handleSave = () => {
    updateProfile(form);
    alert("Profile updated ✅");
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        👤 Profile
      </h1>

      <div className="space-y-3">

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-2 rounded"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <textarea
          placeholder="Address"
          className="w-full border p-2 rounded"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>

      </div>

    </div>
  );
}