import React, { useEffect, useState } from "react";
import PropertyFilter from "../components/PropertyFilter";
import "./FindProperty.css"; // Import the CSS file

function FindProperty() {
  const [cityName, setCityName] = useState("");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPropertiesAndAgents();
  }, []);

  const fetchPropertiesAndAgents = async () => {
    try {
      const propertiesResponse = await fetch('/properties');
      const propertiesData = await propertiesResponse.json();
      const agentsResponse = await fetch('/agents');
      const agentsData = await agentsResponse.json();

      const propertiesWithAgents = propertiesData.map(property => {
        const agent = agentsData.find(agent => agent.id === property.agent_id);
        return { ...property, agent };
      });

      setProperties(propertiesWithAgents);
      setFilteredProperties(propertiesWithAgents);
      setAgents(agentsData);

    } catch (error) {
      console.error("Error fetching properties and agents:", error);
    }
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
    <div className="find-property-container">
      <h1>Find Property For Sale/Rent</h1>

      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter Property Location</label>
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
          <div className="property-cards">
            {filteredProperties.map(property => (
              <div className="property-card" key={property.id}>
                <img src={property.image} alt={property.description} className="property-image" />
                <div className="property-info">
                  <div className="property-price">{property.price}</div>
                  <div className="property-details">
                    <p>Location: {property.location}</p>
                    <p>Bedroom: {property.bedroom}</p>
                    <p>Bathroom: {property.bathroom}</p>
                    <p>Status: {property.status}</p>
                    <p>Sale Type: {property.sale_type}</p>
                    <p>Property Category: {property.property_category}</p>
                    <p>Listed by: {property.agent ? `${property.agent.first_name} ${property.agent.last_name}` : "Unknown"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default FindProperty;
