import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import "./assets/style.css";
import "./assets/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Story from "./pages/Story";


// axios.defaults.headers.common['Authorization'] ='Bearer ' + localStorage.getItem('key')
axios.defaults.baseURL = 'http://localhost:3000/';
const router = createBrowserRouter([
  {
    path:'/',
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
