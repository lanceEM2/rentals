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
            <Link to="/properties/sale">Property For Sale</Link>
            <Link to="/properties/rent">Property For Rent</Link>
            <Link to="/lands/sale">Land For Sale</Link>
            <Link to="/lands/rent">Land For Rent</Link>
            <Link to="/signup">Visitor Hub</Link>
            <Link to="/agent/signup">Agent Hub</Link>
        </div>
    </header>
  );
}

export default NavBar;