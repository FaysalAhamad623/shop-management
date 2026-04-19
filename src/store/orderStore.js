// src/store/orderStore.js

export const getOrders = () => {
  return JSON.parse(localStorage.getItem("orders")) || [];
};

export const addOrder = (order) => {
  const orders = getOrders();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please login first ❌");
    return;
  }

  const newOrder = {
    ...order,
    id: Date.now(),
    userEmail: currentUser.email,
    status: "Pending",
    date: new Date().toLocaleString(),
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
};

export const updateOrderStatus = (id, status) => {
  const orders = getOrders();

  const updated = orders.map((o) =>
    o.id === id ? { ...o, status } : o
  );

  localStorage.setItem("orders", JSON.stringify(updated));
};

export const cancelOrder = (id) => {
  const orders = getOrders();

  const updated = orders.map((o) => {
    if (o.id === id && o.status === "Pending") {
      return { ...o, status: "Cancelled" };
    }
    return o;
  });

  localStorage.setItem("orders", JSON.stringify(updated));
};

export const deleteOrder = (id) => {
  const orders = getOrders();

  const updated = orders.filter((o) => o.id !== id);

  localStorage.setItem("orders", JSON.stringify(updated));
};