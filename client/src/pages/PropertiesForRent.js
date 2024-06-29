import React, { useEffect, useState } from "react";

function PropertiesForRent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('/properties')
            .then((response) => response.json())
            .then((jsonData) => {
                console.log('Fetched data:', jsonData);
                const filteredData = jsonData.filter(property => property.sale_type.toLowerCase() === "for rent");
                setData(filteredData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    return (
        <>
            <h1>Properties For Rent</h1>
            {data.map(property => (
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
        </>
    );
}

export default PropertiesForRent;
