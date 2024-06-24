import React, { useEffect, useState } from "react";
// import { IconHeart } from '@tabler/icons-react';

function ForRent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('/properties')
            .then((response) => response.json())
            .then((jsonData) => {
                console.log('Fetched data:', jsonData);
                const filteredData = jsonData.filter(land => land.status.toLowerCase() === "for rent");
                setData(filteredData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    return (
        <>
            <h1>Houses For Rent In Nairobi</h1>
            {/* {data.length === 0 ? (
                <p>No properties available for rent</p>
            ) : (
                data.map((land) => (
                    <div key={land.id} className="card d-flex flex-column">
                        <div className="row row-0 flex-fill">
                            <div className="col-md-3">
                                <a href="#">
                                    <img src={land.image} className="w-100 h-100 object-cover" alt="Property" />
                                </a>
                            </div>
                            <div className="col">
                                <div className="card-body">
                                    <h3 className="card-title">
                                        <a href="#">{land.location}</a>
                                    </h3>
                                    <div className="text-secondary">{land.description}</div>
                                    <div className="d-flex align-items-center pt-4 mt-auto">
                                        <span className="avatar" style={{ backgroundImage: `url(${land.image})` }}></span>
                                        <div className="ms-3">
                                            <a href="#" className="text-body">Property Owner</a>
                                            <div className="text-secondary">Listed recently</div>
                                        </div>
                                        <div className="ms-auto">
                                            <a href="#" className="icon d-none d-md-inline-block ms-3 text-red">
                                                <IconHeart />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )} */}
        </>
    );
}

export default ForRent;