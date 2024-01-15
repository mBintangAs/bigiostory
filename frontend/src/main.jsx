import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";


import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js";

import "./assets/style.css";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Story from "./pages/Story";
import ActionStory from "./pages/ActionStory";


axios.defaults.baseURL = 'http://localhost:3000';
export const MySwal = withReactContent(Swal)

export const fetchData = async (url, setDataCallback) => {
  try {
    const response = await axios.get(url);
    setDataCallback(response.data);

  } catch (error) {
    console.error(error);
    MySwal.fire({
      title: 'Something went wrong!',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    });
  }
};
export const postData = async (url, data, callback) => {
  try {
    const response = await axios.post(url, data);
    callback(response.data);
  } catch (error) {
    console.error(error);
    MySwal.fire({
      title: 'Something went wrong!',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    });
  }
};
export const deleteData = async (url, callback) => {
  try {
    const response = await axios.delete(url);
    callback(response.data);
  } catch (error) {
    console.error(error);
    MySwal.fire({
      title: 'Something went wrong!',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    });
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={'/story'} />,
    errorElement: <Error />,
  },
  {
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/story",
        element: <Story />,
      },
      {
        path: "/tambah",
        element: <ActionStory />,
      },
      {
        path: "/detail/:judul",
        element: <ActionStory />,
      },
    ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(

  <RouterProvider router={router} />

);
