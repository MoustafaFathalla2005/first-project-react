import { createBrowserRouter } from "react-router-dom";

import MainCom from "./Component/MainCom/MainCom.jsx";
import Home from "./Component/Home/Home.jsx";
import Products from "./Component/Products/Products.jsx";
import ProductDetails from "./Component/ProductDetails/ProductDetails.jsx";
import Cart from "./Component/Cart/Cart.jsx";
import Login from "./Component/Login/Login.jsx";
import NotFound from "./Component/NotFound/NotFound.jsx";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainCom />,
    children: [
      { path: "/", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "details/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routers;
