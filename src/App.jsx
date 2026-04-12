import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customer from "./pages/Customer";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import Reports from "./pages/Reports";
import Home from "./pages/clientPage/Home";
import Cart from "./pages/clientPage/Cart";
import ProductDetails from "./pages/clientPage/ProductDetails";
import Checkout from "./pages/clientPage/Checkout";
import ClientLayout from "./layouts/ClientLayout";
import ClientOrder from "./pages/clientPage/ClientOrder";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// 🔥 Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  // 🔥 CLIENT ROUTES (Navbar shoho)
  {
    element: <ClientLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/my-orders",
        element: <ClientOrder />,
      },
    ],
  },

  // 🔥 ADMIN ROUTES
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/categories",
    element: <Category />,
  },
  {
    path: "/customer",
    element: <Customer />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
]);

// 🔥 App component (missing chilo)
function App() {
  return <RouterProvider router={router} />;
}

export default App;