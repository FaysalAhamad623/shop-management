export const getProducts = () => {
  return JSON.parse(localStorage.getItem("products")) || [];
};

export const saveProduct = (product) => {
  const products = getProducts();
  localStorage.setItem(
    "products",
    JSON.stringify([product, ...products])
  );
};

export const deleteProduct = (id) => {
  const products = getProducts().filter((p) => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
};

export const updateProduct = (updatedProduct) => {
  const products = getProducts().map((p) =>
    p.id === updatedProduct.id ? updatedProduct : p
  );
  localStorage.setItem("products", JSON.stringify(products));
};