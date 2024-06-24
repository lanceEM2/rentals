import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar-container">
        <div className="logo">
            <Link to="/">Landcot</Link>
        </div>
        <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/property/sale">For Sale</Link>
            <Link to="/property/rent">For Rent</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
        </div>
    </header>
  );
}

export default NavBar;