import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import LandFilter from "../components/LandFilter";

function Findland() {
  const [cityName, setCityName] = useState("");
  const [Lands, setLands] = useState([]);
  const [filteredLands, setFilteredLands] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = () => {
    fetch('/lands')
      .then((response) => response.json())
      .then((jsonData) => {
        setLands(jsonData);
        setFilteredLands(jsonData);
      })
      .catch((error) => console.error("Error fetching Lands:", error));
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
      <div>
        <h1>Find land For Sale/Rent</h1>
        {/* <Link to="/land/sale">For Sale</Link>
        <Link to="/land/rent">For Rent</Link> */}

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

        {Lands.length > 0 && (
          <LandFilter data={filteredLands} onFilter={handleFilter} />
        )}

        {filteredLands.length > 0 && (
          <div>
            <h2>Lands in {cityName}</h2>
            {filteredLands.map(land => (
              <div key={land.id}>
                <p>{land.description}</p>
                <img src={land.image} alt={land.description} />
                <p>Location: {land.location}</p>
                <p>Price: {land.price}</p>
                <p>Size: {land.size}</p>
                <p>Status: {land.status}</p>
                <p>Sale Type: {land.sale_type}</p>
              </div>
            ))}
          </div>
        )}
        {errorMessage && <div>{errorMessage}</div>}

      </div>
    </>
  );
}

export default Findland;