import { useEffect } from "react";

export default function Navbar({setSearch}) {
  useEffect(() => {
    const handleSidebarToggle = () => {
      document.querySelector(".sidebar").classList.toggle("open");
      document.querySelector(".content").classList.toggle("open");
    };
    document
      .querySelector(".sidebar-toggler")
      .addEventListener("click", handleSidebarToggle);
  }, []); 
  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-3">
        <div style={{ backgroundColor:"transparent" }} className="sidebar-toggler flex-shrink-0">
          <i className="fa fa-bars" />
        </div>
        
      </nav>
      {/* Navbar End */}
    </>
  );
}
