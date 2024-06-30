import React, { useState } from "react";

function AgentDeleteProperty() {
    const [location, setLocation] = useState("");
    const [saleType, setSaleType] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // Retrieve the token from localStorage or another storage method you use
        const token = localStorage.getItem('token');

        fetch("/resources/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // Include the token in the headers
            },
            body: JSON.stringify({
                location,
                saleType,
            }),
        }).then((r) => {
            if (r.ok) {
                console.log(`${location}'s Property updated successfully`);
            } else {
                console.log("Failed to update Property");
            }
        }).catch((error) => console.error("Error updating Property:", error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Updating {location}'s Property</h1>
                <label htmlFor="location">Enter Location</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label htmlFor="saleType">Enter Sale Type</label>
                <input
                    type="text"
                    id="saleType"
                    value={saleType}
                    onChange={(e) => setSaleType(e.target.value)}
                />
                <button type="submit" className="update-button">Update Property</button>
            </form>
        </div>
    );
}

export default AgentDeleteProperty;
