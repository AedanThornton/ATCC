import React, { useState } from "react";
import searchMatch from "./SearchParser"
import GearCard from "./GearCard/GearCard";
import ArgonautCard from "./ArgonautCard/ArgonautCard";
import gearData from "../data/JSON/gearData.json"
import argonautData from "../data/JSON/argonautData.json"
import utils from "./utils/index";
import SecretOverlay from "./utils/secretUtils"

const CardList = () => {
  const [searchInput, setSearchInput] = useState("");

  // Filter gear based on search input
  const filteredGear = gearData.filter((gear) => searchMatch(gear, searchInput));
  const filteredArgonauts = argonautData.filter((argonaut) => searchMatch(argonaut, searchInput));

  const filteredCards = [
    ...filteredGear,
    ...filteredArgonauts
  ]

  return (
    <>
      {/* Search Bar Input */}
      <input
        type="text"
        placeholder="Search Catalog..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      {/* Render Filtered Card List */}
      <>
        {filteredCards.length > 0 ? (
          filteredCards.map((cardname, index) => {
            const cardTypes = { 
              "Argonaut": (name) => <ArgonautCard key={name.cardIDs} argonaut={name}/>,
              "Gear": (name) => <GearCard key={name.cardIDs[0]} gear={name} />
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
      </>
    </>
  );
};

export default CardList;
