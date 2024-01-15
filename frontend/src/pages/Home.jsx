import Sidebar from "../partials/Sidebar";
import Navbar from "../partials/Navbar";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [isLoad, setIsLoad] = useState(true)
  
  return (
    <>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <Sidebar />
        <div className="content">
          <Navbar />
          <Outlet context={[isLoad, setIsLoad]} />
        </div>
      </div>
    </>
  );
}
