import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AgentProperties() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const token = localStorage.getItem('token');

        fetch('/agent-data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((jsonData) => {
            setData(jsonData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');

        fetch("/resources/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                resource_type: 'property',
                resource_id: id
            })
        }).then((response) => {
            if (response.ok) {
                console.log(`Property with id ${id} deleted successfully`);
                fetchData(); // Refresh the property list after deletion
            } else {
                console.log("Failed to delete Property");
            }
        }).catch((error) => console.error("Error deleting Property:", error));
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
                    <button onClick={() => navigate(`/agent/property-update/${property.id}`)}>Update Property</button>
                    <button onClick={() => handleDelete(property.id)}>Delete Property</button>
                </div>
            ))}
        </>
    );
}

export default AgentProperties;
