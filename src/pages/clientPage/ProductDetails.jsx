import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProducts } from "../../store/productStore";
import { useState } from "react";
import {
  getReviews,
  addReview,
  deleteReview,
} from "../../store/reviewStore";

export default function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const products = getProducts();

  // 🔥 FIND PRODUCT FIRST
  const product = products.find(
    (p) => p.id.toString() === id
  );

  if (!product) {
    return <h2 className="p-6">Product not found ❌</h2>;
  }

  // 🔥 STATE AFTER PRODUCT
  const [reviews, setReviews] = useState(getReviews());

  const [form, setForm] = useState({
    rating: 5,
    comment: "",
  });

  // 🔥 FILTER REVIEWS
  const productReviews = reviews.filter(
    (r) => r.productId === product.id
  );

  // 🔥 AVG RATING
  const avgRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((a, b) => a + b.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : 0;

  // 🔥 ADD REVIEW
  const handleReview = () => {
    if (!form.comment) return;

    const newReview = {
      id: Date.now(),
      productId: product.id,
      rating: Number(form.rating),
      comment: form.comment,
    };

    addReview(newReview);
    setReviews(getReviews());

    setForm({ rating: 5, comment: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">

        {/* Image */}
        <div className="relative w-full h-80 bg-gray-100 rounded overflow-hidden">
          <img
            src={product.image}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-2">
            {product.category}
          </p>

          <p className="text-xl text-blue-500 font-bold mb-4">
            ${product.price}
          </p>

          <p className="mb-4 text-gray-600">
            {product.desc || "No description available"}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>

          {/* ⭐ REVIEW SECTION */}
          <div className="mt-8">

            <h2 className="text-xl font-bold mb-2">
              ⭐ Reviews ({productReviews.length})
            </h2>

            <p className="mb-3 text-yellow-500">
              Average: {avgRating} ⭐
            </p>

            {/* Add Review */}
            <div className="mb-4 space-y-2">

              <select
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: e.target.value })
                }
                className="border p-2 rounded"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              <textarea
                placeholder="Write your review..."
                value={form.comment}
                onChange={(e) =>
                  setForm({ ...form, comment: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <button
                onClick={handleReview}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Submit Review
              </button>

            </div>

            {/* Review List */}
            {productReviews.map((r) => (
              <div key={r.id} className="border p-3 rounded mb-2">

                <p className="text-yellow-500">
                  {"⭐".repeat(r.rating)}
                </p>

                <p>{r.comment}</p>

                <button
                  onClick={() => {
                    deleteReview(r.id);
                    setReviews(getReviews());
                  }}
                  className="text-red-500 text-sm mt-1"
                >
                  Delete
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}