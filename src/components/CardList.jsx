import React, { useState } from "react";
import parseSearch from "./SearchParser";
import utils from "./utils/index";
import SecretOverlay from "./utils/secretUtils";
import FilterControls from "./FilterControls";

import GearCard from "./GearCard/GearCard";
import gearData from "../data/JSON/gearData.json";
import ArgonautCard from "./ArgonautCard/ArgonautCard";
import argonautData from "../data/JSON/argonautData.json";
import PatternCard from "./PatternCard/PatternCard";
import patternData from "../data/JSON/patternData.json";

const fullCardList = [...argonautData, ...gearData, ...patternData]
const cardTypes = [...new Set(fullCardList.map(card => card.cardType))];
const cycles = [...new Set(fullCardList.map(card => card.cycle))];
const cardSizes = [...new Set(fullCardList.map(card => card.cardSize))];   

const CardList = () => {
  const [searchInput, setSearchTerm] = useState("");
  const [filters, setFilter] = useState({
    cardType: [...cardTypes],
    cycle: [...cycles],
    cardSize: [...cardSizes],
    usedFor: [undefined, ...cycles, "Promo"],
  });

  const handleFilterChange = (category, option) => {
    setFilter((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(option)
        ? prevFilters[category].filter((item) => item !== option) // Remove if already selected
        : [...prevFilters[category], option], // Add if not selected
    }));
  };

  // Filter cards
  const filteredCards = fullCardList.filter((card) => {
    // Search Bar
    if (searchInput && !parseSearch(card, searchInput)) return false;
    
    if (!filters.cardType.includes(card.cardType)) return false;
    if (!filters.cycle.includes(card.cycle)) return false;
    if (!filters.cardSize.includes(card.cardSize)) return false; 
    if (!filters.usedFor.includes(card.usedFor)) return false;    

    
    return true
  });

  return (
    <>
      {/* Search Bar Input */}
      <input
        type="text"
        placeholder="Search Catalog..."
        value={searchInput}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "60vw" }}
      />

      {/* Use the new FilterControls component */}
      <FilterControls filters={filters} onFilterChange={handleFilterChange} fullCardList={fullCardList}/>

      {/* Render Filtered Card List */}
      <div className="card-list">
        {filteredCards.length > 0 ? (
          filteredCards.map((cardname, index) => {
            const cardTypes = { 
              "Argonaut": (name) => <ArgonautCard key={name.cardIDs} argonaut={name}/>,
              "Gear": (name) => <GearCard key={name.cardIDs[0]} gear={name} />,
              "Pattern": (name) => <PatternCard key={name.cardIDs[0]} pattern={name} />
            };

            const currentCard = cardTypes[cardname.cardType]?.(cardname) || null;
            const secretOverlay = <>{ 
              (cardname.usedFor?.includes("Secret Deck") || cardname.usedFor?.includes("Envelope"))
              && <SecretOverlay text={cardname.usedFor} key={index + "cover"} /> 
            }</>
            
            return (
              <div key={index} style={{position: "relative"}}>
                {secretOverlay}
                {currentCard}
                <div className="card-type-marker" style={{backgroundColor: "#666"}}>
                  {cardname.cardType}
                </div>
              </div>
            )
          })
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
};

export default CardList;
