import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// 🔐 Auth
import Login from "./pages/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

// 🟢 Client Pages
import Home from "./pages/clientPage/Home";
import Cart from "./pages/clientPage/Cart";
import Checkout from "./pages/clientPage/Checkout";
import ProductDetails from "./pages/clientPage/ProductDetails";
import Profile from "./pages/clientPage/Profile";
import MyOrders from "./pages/clientPage/MyOrders";
import Search from "./pages/clientPage/Search";

// 🔵 Admin Pages
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customer from "./pages/Customer";
import Category from "./pages/Category";
import Reports from "./pages/Reports";
import ProtectedRoute from "./routes/ProtectedRoute";

// 🧱 Layouts
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import Wishlist from "./pages/clientPage/Wishlist";
const router = createBrowserRouter([
  // 🔐 Auth (NO navbar)
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot", element: <Forgot /> },

  // 🟢 Client Routes (Navbar shoho)
  {
    element: <ClientLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/profile", element: <Profile /> },
      { path: "/search", element: <Search /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/my-orders", element: <MyOrders /> },
    ],
  },

  // 🔵 Admin Routes (Sidebar shoho)
  {
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/products", element: <Products /> },
      { path: "/orders", element: <Orders /> },
      { path: "/customer", element: <Customer /> },
      { path: "/categories", element: <Category /> },
      { path: "/reports", element: <Reports /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;