import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyFilter from "../components/PropertyFilter";

function FindProperty() {
  const [cityName, setCityName] = useState("");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    fetch('/properties')
      .then((response) => response.json())
      .then((jsonData) => {
        setProperties(jsonData);
        setFilteredProperties(jsonData);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  };

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = properties.filter(property => property.location.trim().toLowerCase() === cityName.trim().toLowerCase());
    if (filtered.length > 0) {
      setFilteredProperties(filtered);
      setErrorMessage("");
    } else {
      setFilteredProperties([]);
      setErrorMessage("Location not found.");
    }
  };

  const handleFilter = (filteredData) => {
    setFilteredProperties(filteredData);
  };

  return (
    <>
      <div>
        <h1>Find Property For Sale/Rent</h1>
        <Link to="/property/sale">For Sale</Link>
        <Link to="/property/rent">For Rent</Link>

        <h1> Find Land For Sale/Rent</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter Location Name</label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              value={cityName}
              onChange={handleChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {properties.length > 0 && (
          <PropertyFilter data={filteredProperties} onFilter={handleFilter} />
        )}

        {filteredProperties.length > 0 && (
          <div>
            <h2>Properties in {cityName}</h2>
            {filteredProperties.map(property => (
              <div key={property.id}>
                <p>{property.description}</p>
                <img src={property.image} alt={property.description} />
                <p>Location: {property.location}</p>
                <p>Price: {property.price}</p>
                <p>Bedroom: {property.bedroom}</p>
                <p>Bathroom: {property.bathroom}</p>
                <p>Status: {property.status}</p>
                <p>Sale Type: {property.sale_type}</p>
                <p>Property Category: {property.property_category}</p>
              </div>
            ))}
          </div>
        )}
        {errorMessage && <div>{errorMessage}</div>}

      </div>
    </>
  );
}

export default FindProperty;
