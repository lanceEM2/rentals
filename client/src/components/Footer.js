import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
      <>
        <Link to="/about-us">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
      </>
    );
  }

  export default Footer;