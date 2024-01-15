import Sidebar from "../partials/Sidebar";
import Navbar from "../partials/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Home() {
 
  return (
    <>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <Sidebar />
        <div className="content">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
