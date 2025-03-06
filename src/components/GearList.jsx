import React, { useState } from "react";
import GearCard from "./GearCard/GearCard";
import gearData from "../data/JSON/gearData.json"

const GearList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter gear based on search input
  const filteredGear = gearData.filter((gear) =>
    gear.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search Bar Input */}
      <input
        type="text"
        placeholder="Search Gear..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      {/* Render Filtered Gear List */}
      <>
        {filteredGear.length > 0 ? (
          filteredGear.map((gear, index) => <GearCard key={index} gear={gear} />)
        ) : (
          <p>No results found.</p>
        )}
      </>
    </>
  );
};

export default GearList;
