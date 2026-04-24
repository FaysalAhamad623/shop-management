// src/store/profileStore.js

export const getProfile = () => {
  return JSON.parse(localStorage.getItem("currentUser")) || {};
};

export const updateProfile = (data) => {
  const user = getProfile();

  const updatedUser = {
    ...user,
    ...data,
  };

  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.map((u) =>
    u.email === user.email ? updatedUser : u
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

// 🔥 ADDRESS FUNCTIONS

export const addAddress = (address) => {
  const user = getProfile();

  const addresses = user.addresses || [];

  const newAddress = {
    id: Date.now(),
    ...address,
    isDefault: addresses.length === 0, // first = default
  };

  const updated = [...addresses, newAddress];

  updateProfile({ addresses: updated });
};

export const deleteAddress = (id) => {
  const user = getProfile();
  let addresses = user.addresses || [];

  addresses = addresses.filter((a) => a.id !== id);

  updateProfile({ addresses });
};

export const setDefaultAddress = (id) => {
  const user = getProfile();

  const updated = (user.addresses || []).map((a) => ({
    ...a,
    isDefault: a.id === id,
  }));

  updateProfile({ addresses: updated });
};

export const getDefaultAddress = () => {
  const user = getProfile();
  return (user.addresses || []).find((a) => a.isDefault);
};