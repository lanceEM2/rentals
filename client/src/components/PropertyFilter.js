import React, { useState, useEffect, useCallback } from "react";

function PropertyFilter({ data, onFilter }) {
    const [saleType, setSaleType] = useState("Any");
    const [type, setType] = useState("Any");
    const [minPrice, setMinPrice] = useState("Any");
    const [maxPrice, setMaxPrice] = useState("Any");
    const [bedrooms, setBedrooms] = useState("Any");
    const [bathrooms, setBathrooms] = useState("Any");

    const filterData = useCallback(() => {
        console.log("Initial data:", data);
        let filteredData = data;

        if (saleType !== "Any") {
            filteredData = filteredData.filter(item => item.sale_type === saleType);
        }

        if (type !== "Any") {
            filteredData = filteredData.filter(item => item.property_category === type);
        }

        if (minPrice !== "Any") {
            filteredData = filteredData.filter(item => item.price >= parseInt(minPrice.replace("KSH", "")));
        }

        if (maxPrice !== "Any") {
            filteredData = filteredData.filter(item => item.price <= parseInt(maxPrice.replace("KSH", "")));
        }

        if (bedrooms !== "Any") {
            filteredData = filteredData.filter(item => item.bedroom >= parseInt(bedrooms));
        }

        if (bathrooms !== "Any") {
            filteredData = filteredData.filter(item => item.bathroom >= parseInt(bathrooms));
        }

        console.log("Filtered data:", filteredData);
        onFilter(filteredData);
    }, [type, saleType, minPrice, maxPrice, bedrooms, bathrooms, data, onFilter]);

    useEffect(() => {
        const debounceFilter = setTimeout(() => {
            filterData();
        }, 300);

        return () => clearTimeout(debounceFilter);
    }, [filterData]);

    return (
        <>
            <div>
                <label htmlFor="propertyType">Filter Property By:</label>
                <select onChange={(e) => setType(e.target.value)} name="propertyType" id="propertyType">
                    <option value="Any">Any</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="townhouse">Townhouse</option>
                </select>
            </div>

            <div>
                <label htmlFor="saleType">Sale Type</label>
                <select onChange={(e) => setSaleType(e.target.value)} name="saleType" id="saleType">
                    <option value="Any">Any</option>
                    <option value="for sale">for sale</option>
                    <option value="for rent">for rent</option>
                </select>
            </div>

            <div>
                <label htmlFor="minPrice">Min Price</label>
                <select onChange={(e) => setMinPrice(e.target.value)} name="minPrice" id="minPrice">
                    <option value="Any">Any</option>
                    <option value="KSH20000">KSH 20000</option>
                    <option value="KSH50000">KSH 50000</option>
                    <option value="KSH100000">KSH 100000</option>
                    <option value="KSH250000">KSH 250000</option>
                    <option value="KSH500000">KSH 500000</option>
                    <option value="KSH1000000">KSH 1000000</option>
                </select>
            </div>
            <div>
                <label htmlFor="maxPrice">Max Price</label>
                <select onChange={(e) => setMaxPrice(e.target.value)} name="maxPrice" id="maxPrice">
                    <option value="Any">Any</option>
                    <option value="KSH50000">KSH 50000</option>
                    <option value="KSH250000">KSH 250000</option>
                    <option value="KSH500000">KSH 500000</option>
                    <option value="KSH1000000">KSH 1000000</option>
                    <option value="KSH5000000">KSH 5000000</option>
                    <option value="KSH10000000">KSH 10000000</option>
                </select>
            </div>
            <div>
                <label htmlFor="bedrooms">Bedrooms</label>
                <select onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" id="bedrooms">
                    <option value="Any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                </select>
            </div>
            <div>
                <label htmlFor="bathrooms">Bathrooms</label>
                <select onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="bathrooms">
                    <option value="Any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                </select>
            </div>
        </>
    );
}

export default PropertyFilter;
