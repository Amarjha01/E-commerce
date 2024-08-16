import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Forgotpassword from "../pages/ForgotPassword";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import Allproducts from "../pages/AllProducts";
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'

import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgotPassword",
        element: <Forgotpassword />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "Admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-Users",
            element: <AllUsers />,
            children:[
              {
                
              }
            ]
          },
          {
            path: "all-products",
            element: <Allproducts />,
          },
        ],
      },
      {
        path: "category-product/:categoryName",
        element: <CategoryProduct />,
      },
      {
        path: "Product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;
