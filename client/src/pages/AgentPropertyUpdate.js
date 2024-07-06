import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AgentPropertyUpdate() {
    const { id } = useParams();
    const [location, setLocation] = useState("");
    const [saleType, setSaleType] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [bathroom, setBathroom] = useState("");
    const [image, setImage] = useState("");
    const [propertyCategory, setPropertyCategory] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {
        const token = localStorage.getItem('token');

        fetch(`/agent/properties/${id}`, {
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
            setBedroom(data.bedroom);
            setBathroom(data.bathroom);
            setDescription(data.description);
            setPropertyCategory(data.property_category);
            setImage(data.image);
            setStatus(data.status);
        })
        .catch((error) => console.error("Error fetching property data:", error));
    };

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const updatedData = {
            location,
            sale_type: saleType,
            price,
            description,
            bedroom,
            bathroom,
            property_category: propertyCategory,
            image,
            status
        };

        fetch("/resources/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                resource_type: 'property',
                resource_id: id,
                ...updatedData
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
                <label htmlFor="price">Enter Price</label>
                <input
                    type="number"
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
                <label htmlFor="bedroom">No of Bedrooms</label>
                <input
                    type="number"
                    id="bedroom"
                    value={bedroom}
                    onChange={(e) => setBedroom(e.target.value)}
                />
                <label htmlFor="bathroom">No of Bathrooms</label>
                <input
                    type="number"
                    id="bathroom"
                    value={bathroom}
                    onChange={(e) => setBathroom(e.target.value)}
                />
                <label htmlFor="propertyCategory">Enter Property Category</label>
                <input
                    type="text"
                    id="propertyCategory"
                    value={propertyCategory}
                    onChange={(e) => setPropertyCategory(e.target.value)}
                />
                <label htmlFor="status">Enter Status</label>
                <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <button type="submit" className="update-button">Update Property</button>
            </form>
        </div>
    );
}

export default AgentPropertyUpdate;
