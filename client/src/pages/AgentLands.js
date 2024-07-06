import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AgentLands.css"; // Import your CSS file for styling

function AgentLands() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

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

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');

        fetch("/resources/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                resource_type: 'land',
                resource_id: id
            })
        }).then((response) => {
            if (response.ok) {
                console.log(`Land with id ${id} deleted successfully`);
                fetchData(); // Refresh the property list after deletion
            } else {
                console.log("Failed to delete Land");
            }
        }).catch((error) => console.error("Error deleting Land:", error));
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2>My Lands</h2>
            <div className="lands-container">
                {data.lands.map(land => (
                    <div key={land.id} className="land-card">
                        <p>Location: {land.location}</p>
                        <p>Description: {land.description}</p>
                        <p>Price: {land.price}</p>
                        <p>Size: {land.size}</p>
                        <p>Image: {land.image}</p>
                        <p>Property Category: {land.property_category}</p>
                        <p>Sale Type: {land.sale_type}</p>
                        <p>Status: {land.status}</p>
                        <div className="button-container">
                            <button onClick={() => navigate(`/agent/land-update/${land.id}`)} className="land-btn">Update Land</button>
                            <button onClick={() => handleDelete(land.id)} className="land-btn">Delete Land</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AgentLands;
