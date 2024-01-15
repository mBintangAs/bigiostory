import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import "./assets/style.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Story from "./pages/Story";


axios.defaults.baseURL = 'http://localhost:3000';
export const MySwal = withReactContent(Swal)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={'/story'} />,
    errorElement: <Error />,
  },
  {
    element:<Home/>,
    errorElement: <Error />,
    children: [
      {
        path: "/story",
        element: <Story />,
      },
    ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />
  
);
