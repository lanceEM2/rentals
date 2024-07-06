import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomerSignup from "./pages/CustomerSignup";
import CustomerLogin from "./pages/CustomerLogin";
import AgentSignup from "./pages/AgentSignup";
import AgentLogin from "./pages/AgentLogin";
import AgentProfile from "./pages/AgentProfile";
import AgentProperties from "./pages/AgentProperties"
import AgentLands from "./pages/AgentLands";
import AgentProfileUpdate from "./pages/AgentProfileUpdate";
import AgentAddProperty from "./pages/AgentAddProperty";
import AgentAddLand from "./pages/AgentAddLand";
import AgentPropertyUpdate from "./pages/AgentPropertyUpdate";
import AgentLandUpdate from "./pages/AgentLandUpdate";
import PropertiesForSale from "./pages/PropertiesForSale";
import PropertiesForRent from "./pages/PropertiesForRent";
import LandsForSale from "./pages/LandsForSale";
import LandsForRent from "./pages/LandsForRent";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<CustomerSignup />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/properties/sale" element={<PropertiesForSale />} />
        <Route path="/properties/rent" element={<PropertiesForRent />} />
        <Route path="/lands/sale" element={<LandsForSale />} />
        <Route path="/lands/rent" element={<LandsForRent />} />
        <Route path="/agent/signup" element={<AgentSignup />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/profile" element={<AgentProfile />} />
        <Route path="/agent/profile-update" element={<AgentProfileUpdate />} />
        <Route path="/agent/add-property" element={<AgentAddProperty />} />
        <Route path="/agent/add-land" element={<AgentAddLand />} />
        <Route path="/agent/properties" element={<AgentProperties />} />
        <Route path="/agent/lands" element={<AgentLands/>} />
        <Route path="/agent/property-update/:id" element={<AgentPropertyUpdate/>} />
        <Route path="/agent/land-update/:id" element={<AgentLandUpdate/>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

