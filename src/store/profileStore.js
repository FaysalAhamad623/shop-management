// 🔥 GET PROFILE
export const getProfile = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user || {};
};

// 🔥 UPDATE PROFILE
export const updateProfile = (data) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const updatedUser = {
    ...user,
    ...data,
  };

  // 🔥 update currentUser
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  // 🔥 update users array
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.map((u) =>
    u.email === user.email ? updatedUser : u
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));
};