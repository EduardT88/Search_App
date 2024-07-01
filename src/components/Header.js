import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";

export default function Header() {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="container-fluid bg-dark text-white shadow-sm">
      <div className="container p-3">
        <div className="row align-items-center">
          <div
            className="logo col-auto"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          >
            <h2 className="m-0 text-warning">Worker Search Application</h2>
          </div>
          <nav className="col-auto ms-auto">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites" className="nav-link text-white">
                  <FaUsers className="me-1" /> Favorites
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
