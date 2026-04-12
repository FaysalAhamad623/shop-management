import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../../store/cartStore";

export default function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 Demo product list (same as Home)
  const products = [
    {
      id: 1,
      name: "T-Shirt",
      price: 20,
      category: "Clothing",
      image: "https://via.placeholder.com/300",
      desc: "Comfortable cotton t-shirt for everyday wear.",
    },
    {
      id: 2,
      name: "Burger",
      price: 5,
      category: "Food",
      image: "https://via.placeholder.com/300",
      desc: "Delicious fresh burger with cheese.",
    },
    {
      id: 3,
      name: "Headphone",
      price: 60,
      category: "Electronics",
      image: "https://via.placeholder.com/300",
      desc: "High quality sound with noise cancellation.",
    },
  ];

  // 🔥 Find product
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="p-6">Product not found</h2>;
  }

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
        <img
          src={product.image}
          className="w-full h-80 object-cover rounded"
        />

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

          <p className="mb-4">
            {product.desc}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>

      </div>

    </div>
  );
}