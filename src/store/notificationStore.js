export const getNotifications = () => {
  return JSON.parse(localStorage.getItem("notifications")) || [];
};

export const addNotification = (msg) => {
  const old = getNotifications();

  const newNoti = {
    id: Date.now(),
    message: msg,
    time: new Date().toLocaleString(),
  };

  localStorage.setItem(
    "notifications",
    JSON.stringify([newNoti, ...old])
  );
};

export const clearNotifications = () => {
  localStorage.removeItem("notifications");
};