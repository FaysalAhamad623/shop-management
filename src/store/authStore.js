export const loginAdmin = (email, password) => {
  if (email === "admin@gmail.com" && password === "1234") {
    localStorage.setItem("admin", "true");
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem("admin");
};

export const isAdmin = () => {
  return localStorage.getItem("admin") === "true";
};