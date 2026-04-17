export const flyToCart = (imgElement) => {
  const cart = document.getElementById("cart-icon");
  if (!cart || !imgElement) return;

  const imgRect = imgElement.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  const clone = imgElement.cloneNode(true);

  clone.style.position = "fixed";
  clone.style.top = imgRect.top + "px";
  clone.style.left = imgRect.left + "px";
  clone.style.width = imgRect.width + "px";
  clone.style.height = imgRect.height + "px";
  clone.style.zIndex = 9999;
  clone.style.transition = "all 0.8s ease-in-out";
  clone.style.borderRadius = "12px";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.top = cartRect.top + "px";
    clone.style.left = cartRect.left + "px";
    clone.style.width = "40px";
    clone.style.height = "40px";
    clone.style.opacity = "0.5";
  }, 50);

  setTimeout(() => {
    clone.remove();
  }, 800);
};