export let wishlist =
  JSON.parse(localStorage.getItem("wishlist")) || [];

const saveWishlist = () => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

export const toggleWishlist = (product) => {
  const exist = wishlist.find((p) => p.id === product.id);

  if (exist) {
    wishlist = wishlist.filter((p) => p.id !== product.id);
  } else {
    wishlist.push(product);
  }

  saveWishlist();
};