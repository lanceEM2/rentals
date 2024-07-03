import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AgentAddLand() {
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("");
    const [image, setImage] = useState("");
    const [saleType, setSaleType] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");

        fetch("/resources/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Include the token in the headers
            },
            body: JSON.stringify({
                resource_type: 'land',  // Specify the resource type
                property_category: 'land',  // Specify the property category
                location,
                price,
                description,
                size,
                image,
                sale_type: saleType, // Ensure the key matches the backend's expected field name
                status,
            }),
        }).then((r) => {
            if (r.ok) {
                // Navigate to his/her lands
                navigate('/agent/lands');
            } else if (r.status === 401) {
                alert("Unauthorized!");
                navigate('/');
            } else {
                alert("Failed to add land. Please try again.");
            }
        }).catch((error) => {
            console.error("Error during land addition:", error);
            alert("land addition failed. Please try again later.");
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Add Land</h1>
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    autoComplete="off"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    autoComplete="off"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoComplete="off"
                />
                <label htmlFor="size">Size</label>
                <input
                    type="text"
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    autoComplete="off"
                />
                <label htmlFor="image">Image</label>
                <input
                    type="text"
                    id="image"
                    autoComplete="off"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <label htmlFor="saleType">Sale Type</label>
                <input
                    type="text"
                    id="saleType"
                    autoComplete="off"
                    value={saleType}
                    onChange={(e) => setSaleType(e.target.value)}
                />
                <label htmlFor="status">Status</label>
                <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    autoComplete="off"
                />
                <button type="submit">Add Land</button>
            </form>
        </div>
    );
}

export default AgentAddLand;
