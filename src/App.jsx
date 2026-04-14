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
import Wishlist from "./pages/clientPage/Wishlist";
import OrderDetails from "./pages/OrderDetails"; // 🔥 IMPORTANT

// 🔵 Admin Pages
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customer from "./pages/Customer";
import Category from "./pages/Category";
import Reports from "./pages/Reports";
import AdminLogin from "./pages/admin/AdminLogin";

// 🔐 Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

// 🧱 Layouts
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";

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

      // 🔥 FIX (User + Admin both can access)
      { path: "/order/:id", element: <OrderDetails /> },
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
      { path: "/admin-login", element: <AdminLogin /> },

      // 🔥 (optional duplicate remove korsi)
      // { path: "/order/:id", element: <OrderDetails /> },

      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;