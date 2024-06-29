import React, { useState, useEffect } from "react";

function AgentLands() {
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
            <h2>My Lands</h2>
            {data.lands.map(land => (
                <div key={land.id}>
                    <p>Location: {land.location}</p>
                    <p>Description: {land.description}</p>
                    <p>Price: {land.price}</p>
                    <p>Size: {land.size}</p>
                    <p>Image: {land.image}</p>
                    <p>land Category: {land.property_category}</p>
                    <p>Sale Type: {land.sale_type}</p>
                    <p>Status: {land.status}</p>
                </div>
            ))}
        </>
    );
}

export default AgentLands;
