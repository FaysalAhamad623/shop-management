export const getOrders = () => {
  return JSON.parse(localStorage.getItem("orders")) || [];
};

export const saveOrder = (order) => {
  const orders = getOrders();
  localStorage.setItem("orders", JSON.stringify([order, ...orders]));
};
export const deleteOrder = (id) => {
  const orders = getOrders().filter((o) => o.id !== id);
  localStorage.setItem("orders", JSON.stringify(orders));
};
export const updateOrderStatus = (id, status) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const updated = orders.map((o) =>
    o.id === id ? { ...o, status } : o
  );

  localStorage.setItem("orders", JSON.stringify(updated));
};
export const cancelOrder = (id) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const updated = orders.map((o) =>
    o.id === id && o.status === "Pending"
      ? { ...o, status: "Cancelled" }
      : o
  );

  localStorage.setItem("orders", JSON.stringify(updated));
};