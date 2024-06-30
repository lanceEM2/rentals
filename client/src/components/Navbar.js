import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Make sure to create and import the relevant CSS for styling

function NavBar() {
  return (
    <header className="navbar-container">
      <div className="logo">
        <Link to="/">Landcot</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        
        <div className="dropdown">
          <span>Properties</span>
          <ul className="dropdown-menu">
            <li><Link to="/properties/sale">Properties For Sale</Link></li>
            <li><Link to="/properties/rent">Properties For Rent</Link></li>
          </ul>
        </div>
        
        <div className="dropdown">
          <span>Lands</span>
          <ul className="dropdown-menu">
            <li><Link to="/lands/sale">Land For Sale</Link></li>
            <li><Link to="/lands/rent">Land For Rent</Link></li>
          </ul>
        </div>
        
        <div className="dropdown">
          <span>Visitor Hub</span>
          <ul className="dropdown-menu">
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        
        <div className="dropdown">
          <span>Agent Hub</span>
          <ul className="dropdown-menu">
            <li><Link to="/agent/signup">Signup</Link></li>
            <li><Link to="/agent/login">Login</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
