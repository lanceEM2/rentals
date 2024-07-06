import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import your CSS file for styling

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-links">
                <Link to="/about-us">About Us</Link>
                <Link to="/contact-us">Contact Us</Link>
            </div>
        </footer>
    );
}

export default Footer;
