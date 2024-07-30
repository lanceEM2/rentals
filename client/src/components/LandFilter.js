import React, { useState, useEffect, useCallback } from "react";
import './PropertyFilter.css'; // Import the CSS file

function LandFilter({ data, onFilter }) {
    const [saleType, setSaleType] = useState("Any");
    const [minPrice, setMinPrice] = useState("Any");
    const [maxPrice, setMaxPrice] = useState("Any");
    const [landsize, setLandSize] = useState("Any");

    const filterData = useCallback(() => {
        console.log("Initial data:", data);
        let filteredData = data;

        if (saleType !== "Any") {
            filteredData = filteredData.filter(item => item.sale_type === saleType);
        }

        if (minPrice !== "Any") {
            filteredData = filteredData.filter(item => item.price >= parseInt(minPrice.replace('KSH', '')));
        }

        if (maxPrice !== "Any") {
            filteredData = filteredData.filter(item => item.price <= parseInt(maxPrice.replace('KSH', '')));
        }

        if (landsize !== "Any") {
            filteredData = filteredData.filter(item => item.size === landsize);
        }

        console.log("Filtered data:", filteredData);
        onFilter(filteredData);
    }, [saleType, minPrice, maxPrice, landsize, data, onFilter]);

    useEffect(() => {
        const debounceFilter = setTimeout(() => {
            filterData();
        }, 300);

        return () => clearTimeout(debounceFilter);
    }, [filterData]);

    return (
        <div className="filter-container">
          <div className="filter-item">
            <label htmlFor="saleType">Sale Type</label>
            <select onChange={(e) => setSaleType(e.target.value)} name="saleType" id="saleType">
              <option value="Any">Any</option>
              <option value="for sale">For Sale</option>
              <option value="for rent">For Rent</option>
            </select>
          </div>

          <div className="filter-item">
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

          <div className="filter-item">
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

          <div className="filter-item">
            <label htmlFor="landsize">Land Size</label>
            <select onChange={(e) => setLandSize(e.target.value)} name="size" id="size">
                <option value="Any">Any</option>
                <option value="1/8">50 feet x 100 feet (approximately 1/8 acre)</option>
                <option value="1/4">100 feet x 100 feet (approximately 1/4 acre)</option>
                <option value="50x80">50 feet x 80 feet</option>
                <option value="60x120">60 feet x 120 feet</option>
                <option value="40x80">40 feet x 80 feet</option>
            </select>
          </div>
        </div>
    );
}

export default LandFilter;
