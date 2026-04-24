import { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  addAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../store/profileStore";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [addressForm, setAddressForm] = useState({
    label: "Home",
    address: "",
  });

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const user = getProfile();

    setForm({
      name: user.name || "",
      phone: user.phone || "",
    });

    setAddresses(user.addresses || []);
  }, []);

  const handleSave = () => {
    updateProfile(form);
    alert("Profile updated ✅");
  };

  const handleAddAddress = () => {
    if (!addressForm.address) return;

    addAddress(addressForm);

    const updated = getProfile();
    setAddresses(updated.addresses);

    setAddressForm({ label: "Home", address: "" });
  };

  const handleDelete = (id) => {
    deleteAddress(id);
    setAddresses(getProfile().addresses);
  };

  const handleDefault = (id) => {
    setDefaultAddress(id);
    setAddresses(getProfile().addresses);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">👤 Profile</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-2 py-1 rounded">
          Logout
        </button>
      </div>

      {/* BASIC INFO */}
      <input
        placeholder="Name"
        className="w-full border p-2 mb-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Phone"
        className="w-full border p-2 mb-3"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded mb-4">
        Save
      </button>

      {/* ADD ADDRESS */}
      <h2 className="font-bold mb-2">📍 Addresses</h2>

      <select
        value={addressForm.label}
        onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
        className="border p-2 w-full mb-2"
      >
        <option>Home</option>
        <option>Office</option>
        <option>Other</option>
      </select>

      <input
        placeholder="Full Address"
        className="w-full border p-2 mb-2"
        value={addressForm.address}
        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
      />

      <button onClick={handleAddAddress} className="bg-green-500 text-white px-3 py-1 rounded mb-4">
        Add Address
      </button>

      {/* ADDRESS LIST */}
      {addresses.map((a) => (
        <div key={a.id} className="border p-3 mb-2 rounded">

          <p><b>{a.label}</b></p>
          <p>{a.address}</p>

          {a.isDefault && (
            <p className="text-green-600 text-sm">Default</p>
          )}

          <div className="flex gap-2 mt-2 text-sm">

            <button onClick={() => handleDefault(a.id)} className="text-blue-500">
              Set Default
            </button>

            <button onClick={() => handleDelete(a.id)} className="text-red-500">
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}