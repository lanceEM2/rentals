import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AgentAddProperty() {
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [bathroom, setBathroom] = useState("");
    const [image, setImage] = useState("");
    const [saleType, setSaleType] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");

        fetch("/property/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Include the token in the headers
            },
            body: JSON.stringify({
                location,
                price,
                description,
                bedroom,
                bathroom,
                image,
                sale_type: saleType, // Ensure the key matches the backend's expected field name
                status,
            }),
        }).then((r) => {
            if (r.ok) {
                // Navigate to his/her properties
                navigate('/agent/properties');
            } else if (r.status === 401) {
                alert("Unauthorized!");
                navigate('/');
            } else {
                alert("Failed to add property. Please try again.");
            }
        }).catch((error) => {
            console.error("Error during property addition:", error);
            alert("Property addition failed. Please try again later.");
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Add Property</h1>
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
                <label htmlFor="bedroom">Bedroom</label>
                <input
                    type="number"
                    id="bedroom"
                    value={bedroom}
                    onChange={(e) => setBedroom(e.target.value)}
                    autoComplete="off"
                />
                <label htmlFor="bathroom">Bathroom</label>
                <input
                    type="number"
                    id="bathroom"
                    value={bathroom}
                    onChange={(e) => setBathroom(e.target.value)}
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
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
}

export default AgentAddProperty;
