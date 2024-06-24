import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import './App.css';
import CustomerSignup from "./pages/CustomerSignup";
import CustomerLogin from "./pages/CustomerLogin";
import Home from "./components/Home";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import ForRent from "./pages/ForRent";
import ForSale from "./pages/ForSale";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/sale" element={<ForSale />} />
        <Route path="/property/rent" element={<ForRent />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<CustomerSignup />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

