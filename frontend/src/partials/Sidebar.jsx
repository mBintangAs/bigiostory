import { NavLink } from "react-router-dom";
export default function Sidebar() {
return (
  <>
    {/* Sidebar Start */}
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-light navbar-light">
        <div className="navbar-brand mx-4 mb-3">
          <img src={"./KMLOGO.png"} alt="" style={{ width: "100px" }} />
        </div>

        <div className="navbar-nav w-100">
          <NavLink to={'/books'} activeclassname="active" className="nav-item nav-link mb-3">
            <i className="fas fa-clipboard-list me-2"></i>
            Buku
          </NavLink>

        </div>
      </nav>
    </div>
    {/* Sidebar End */}
  </>
);
}
