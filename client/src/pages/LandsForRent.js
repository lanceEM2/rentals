import React, { useEffect, useState } from "react";

function LandsForRent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('/lands')
            .then((response) => response.json())
            .then((jsonData) => {
                console.log('Fetched data:', jsonData);
                const filteredData = jsonData.filter(land => land.sale_type.toLowerCase() === "for rent");
                setData(filteredData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    return (
        <>
            <h1>Lands For Rent</h1>
            {data.map(land => (
                <div key={land.id}>
                    <p>Location: {land.location}</p>
                    <p>Description: {land.description}</p>
                    <p>Price: {land.price}</p>
                    <p>Image: {land.image}</p>
                    <p>Size: {land.size}</p>
                    <p>Property Category: {land.land_category}</p>
                    <p>Sale Type: {land.sale_type}</p>
                    <p>Status: {land.status}</p>
                </div>
            ))}
        </>
    );
}

export default LandsForRent;
