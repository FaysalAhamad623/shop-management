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
  const orders = getOrders();

  const updated = orders.map((o) =>
    o.id === id ? { ...o, status } : o
  );

  localStorage.setItem("orders", JSON.stringify(updated));
};