import React, { useEffect, useState } from "react";
import LandFilter from "../components/LandFilter";
import "./FindProperty.css"; // Import the CSS file

function Findland() {
  const [cityName, setCityName] = useState("");
  const [Lands, setLands] = useState([]);
  const [filteredLands, setFilteredLands] = useState([]);
  const [agents, setAgents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchLandsAndAgents();
  }, []);

  const fetchLandsAndAgents = async () => {
    try {
      const landsResponse = await fetch('/lands');
      const landsData = await landsResponse.json();
      const agentsResponse = await fetch('/agents');
      const agentsData = await agentsResponse.json();

      const landsWithAgents = landsData.map(land => {
        const agent = agentsData.find(agent => agent.id === land.agent_id);
        return { ...land, agent};
      });

      setLands(landsWithAgents);
      setFilteredLands(landsWithAgents);
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
    const filtered = Lands.filter(land => land.location.trim().toLowerCase() === cityName.trim().toLowerCase());
    if (filtered.length > 0) {
      setFilteredLands(filtered);
      setErrorMessage("");
    } else {
      setFilteredLands([]);
      setErrorMessage("Location not found.");
    }
  };

  const handleFilter = (filteredData) => {
    setFilteredLands(filteredData);
  };

  return (
    <>
      <div className="find-property-container">
        <h1>Find land For Sale/Rent</h1>

        <div className="search-form">
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

        {Lands.length > 0 && (
          <LandFilter data={filteredLands} onFilter={handleFilter} />
        )}

        {filteredLands.length > 0 && (
          <div>
            <h2>Lands in {cityName}</h2>
            <div  className="property-cards">
              {filteredLands.map(land => (
                <div className="property-card" key={land.id}>
                  <img src={land.image} alt={land.description} className="property-image" />
                  <div className="property-info">
                    <div className="property-price">{land.price}</div>
                    <div className="property-details">
                      <p>Location: {land.location}</p>
                      <p>Size: {land.size}</p>
                      <p>Status: {land.status}</p>
                      <p>Sale Type: {land.sale_type}</p>
                      <p>Listed by: {land.agent ? `${land.agent.first_name} ${land.agent.last_name}` : "Unknown"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

      </div>
    </>
  );
}

export default Findland;