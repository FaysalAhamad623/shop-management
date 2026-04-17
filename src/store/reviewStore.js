export const getReviews = () => {
  return JSON.parse(localStorage.getItem("reviews")) || [];
};

export const addReview = (review) => {
  const old = getReviews();

  localStorage.setItem(
    "reviews",
    JSON.stringify([review, ...old])
  );
};

export const deleteReview = (id) => {
  const reviews = getReviews().filter((r) => r.id !== id);

  localStorage.setItem("reviews", JSON.stringify(reviews));
};