import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <header className="navbar-container">
      <div className="logo">
        <Link to="/">Landcot</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>

        <div className="dropdown">
          <span onClick={() => handleDropdownClick("properties")}>Properties</span>
          <ul className={`dropdown-menu ${activeDropdown === "properties" ? "show" : ""}`}>
            <li><Link to="/properties/sale">Properties For Sale</Link></li>
            <li><Link to="/properties/rent">Properties For Rent</Link></li>
          </ul>
        </div>

        <div className="dropdown">
          <span onClick={() => handleDropdownClick("lands")}>Lands</span>
          <ul className={`dropdown-menu ${activeDropdown === "lands" ? "show" : ""}`}>
            <li><Link to="/lands/sale">Land For Sale</Link></li>
            <li><Link to="/lands/rent">Land For Rent</Link></li>
          </ul>
        </div>

        <div className="dropdown">
          <span onClick={() => handleDropdownClick("visitorHub")}>Visitor Hub</span>
          <ul className={`dropdown-menu ${activeDropdown === "visitorHub" ? "show" : ""}`}>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="dropdown">
          <span onClick={() => handleDropdownClick("agentHub")}>Agent Hub</span>
          <ul className={`dropdown-menu ${activeDropdown === "agentHub" ? "show" : ""}`}>
            <li><Link to="/agent/signup">Signup</Link></li>
            <li><Link to="/agent/login">Login</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
