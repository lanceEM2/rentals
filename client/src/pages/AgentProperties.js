import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AgentProperties() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Retrieve the token from localStorage or wherever it is stored
        const token = localStorage.getItem('token');

        fetch('/agent-data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include the token in the headers
            }
        })
        .then((response) => response.json())
        .then((jsonData) => {
            console.log('Fetched data:', jsonData);
            setData(jsonData);  // Update state with fetched data
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2>My Properties</h2>
            {data.properties.map(property => (
                <div key={property.id}>
                    <p>Location: {property.location}</p>
                    <p>Description: {property.description}</p>
                    <p>Price: {property.price}</p>
                    <p>Image: {property.image}</p>
                    <p>Bedroom: {property.bedroom}</p>
                    <p>Bathroom: {property.bathroom}</p>
                    <p>Property Category: {property.property_category}</p>
                    <p>Sale Type: {property.sale_type}</p>
                    <p>Status: {property.status}</p>
                </div>
            ))}

            <Link to="/agent/property-update">Update Property</Link>
            <Link to="/agent/property-delete">Delete Property</Link>

        </>
    );
}

export default AgentProperties;
