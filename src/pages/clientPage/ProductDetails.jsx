import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProducts } from "../../store/productStore";
import { useState, useRef } from "react";
import { flyToCart } from "../../utils/flyToCart";
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

  const product = products.find(
    (p) => p.id.toString() === id
  );

  if (!product) return <h2 className="p-6">Product not found ❌</h2>;

  // 🔥 STATES
  const [reviews, setReviews] = useState(getReviews());
  const [hover, setHover] = useState(0);

  const [form, setForm] = useState({
    rating: 5,
    comment: "",
  });

  const [editId, setEditId] = useState(null);

  // 🔥 FILTER
  const productReviews = reviews.filter(
    (r) => r.productId === product.id
  );

  // 🔥 AVG
  const avgRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((a, b) => a + b.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : 0;

  // 🔥 ADD / UPDATE
  const handleReview = () => {
    if (!form.comment) return;

    if (editId) {
      const updated = reviews.map((r) =>
        r.id === editId
          ? { ...r, rating: form.rating, comment: form.comment }
          : r
      );

      localStorage.setItem("reviews", JSON.stringify(updated));
      setReviews(updated);
      setEditId(null);

    } else {
      const newReview = {
        id: Date.now(),
        productId: product.id,
        rating: Number(form.rating),
        comment: form.comment,
      };

      addReview(newReview);
      setReviews(getReviews());
    }

    setForm({ rating: 5, comment: "" });
  };

  const handleEdit = (r) => {
    setForm({ rating: r.rating, comment: r.comment });
    setEditId(r.id);
  };

  // 🔥 RELATED PRODUCTS
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const imgRef = useRef(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">

        {/* IMAGE */}
       <img
  ref={imgRef}
  src={product.image}
  className="w-full h-full object-contain"
/>

        {/* INFO */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.category}</p>

          <p className="text-xl text-blue-500 font-bold my-3">
            ${product.price}
          </p>

          <p className="text-gray-600 mb-4">
            {product.desc || "No description available"}
          </p>

        <button
  onClick={() => {
    flyToCart(imgRef.current); // 🔥 animation
    addToCart(product);        // 🔥 cart add
  }}
  className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
>
  Add to Cart
</button>
          {/* ⭐ REVIEW */}
          <div className="mt-8">

            <h2 className="text-xl font-bold">
              ⭐ Reviews ({productReviews.length})
            </h2>

            <p className="text-yellow-500 mb-3">
              Average: {avgRating}
            </p>

            {/* ⭐ STAR UI (FIXED) */}
      <div className="flex gap-1 text-2xl cursor-pointer mb-2">

  {[1, 2, 3, 4, 5].map((star) => {

    const activeStar = hover !== 0 ? hover : form.rating;

    return (
      <span
        key={star}
        onClick={() =>
          setForm({ ...form, rating: Number(star) })
        }
        onMouseEnter={() => setHover(star)}
        onMouseLeave={() => setHover(0)}
        className={`
          transition duration-200

          ${
            star <= activeStar
              ? hover !== 0
                ? "text-blue-400 scale-110"   // 🔥 hover
                : "text-green-500"           // 🔥 selected (FIXED)
              : "text-gray-300"
          }
        `}
      >
        ⭐
      </span>
    );
  })}

</div>

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
              className="bg-green-500 text-white px-4 py-1 mt-2 rounded"
            >
              {editId ? "Update" : "Submit"}
            </button>

            {/* LIST */}
            {productReviews.map((r) => (
              <div key={r.id} className="border p-3 rounded mt-3 flex gap-3">

                {/* 👤 Avatar */}
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  👤
                </div>

                <div className="flex-1">
                  <p className="text-yellow-500">
                    {"⭐".repeat(r.rating)}
                  </p>

                  <p>{r.comment}</p>

                  <div className="flex gap-3 text-sm mt-1">
                    <button onClick={() => handleEdit(r)} className="text-blue-500">
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        deleteReview(r.id);
                        setReviews(getReviews());
                      }}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* 🔥 RELATED PRODUCTS */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="bg-white p-3 rounded shadow cursor-pointer hover:scale-105 transition"
            >
              <img src={p.image} className="h-32 w-full object-contain" />
              <p className="font-bold text-sm mt-2">{p.name}</p>
              <p className="text-blue-500">${p.price}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}