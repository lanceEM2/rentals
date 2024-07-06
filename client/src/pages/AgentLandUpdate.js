import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AgentLandUpdate() {
    const { id } = useParams();
    const [location, setLocation] = useState("");
    const [saleType, setSaleType] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("");
    const [image, setImage] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {
        const token = localStorage.getItem('token');

        fetch(`/agent/lands/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setLocation(data.location);
            setSaleType(data.sale_type);
            setPrice(data.price);
            setDescription(data.description);
            setSize(data.size);
            setImage(data.image);
            setStatus(data.status)
        })
        .catch((error) => console.error("Error fetching land data:", error));
    };

    function handleSubmit(e) {
        e.preventDefault();

        // Retrieve the token from localStorage or another storage method you use
        const token = localStorage.getItem('token');

        const updatedData = {
            location,
            sale_type: saleType,
            price,
            description,
            size,
            image,
            status
        };

        fetch("/resources/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // Include the token in the headers
            },
            body: JSON.stringify({
                resource_type: 'land',  // Specify the resource type
                resource_id: id,
                ...updatedData
            }),
        }).then((r) => {
            if (r.ok) {
                console.log(`${location}'s Land updated successfully`);
            } else {
                console.log("Failed to update Land");
            }
        }).catch((error) => console.error("Error updating Land:", error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Updating {location}'s Land</h1>
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
                <label htmlFor="price">Enter Price</label>
                <input
                    type="integer"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="image">Enter Image</label>
                <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <label htmlFor="description">Enter Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="size">Area/Size</label>
                <input
                    type="text"
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
                <label htmlFor="status">Enter Status</label>
                <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <button type="submit" className="update-button">Update Land</button>
            </form>
        </div>
    );
}

export default AgentLandUpdate;
