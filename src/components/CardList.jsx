import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/cardlist.css";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { useCards } from "../hooks/useCards";
import CardRenderer from "./CardRenderer"
import ControlBar from "./ControlBar";

const CardList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  //Response values from API
  const { filterOptions, optionsLoading, optionsError } = useFilterOptions();
  const { filteredCards, totalPages, totalCards, isLoading, error } = useCards(searchParams);

  // Set Initial params if missing
  useEffect(() => {
    if (!searchParams.has("p") || !searchParams.has("s") || !searchParams.has("limit")) {
      const newParams = new URLSearchParams(searchParams)

      if (!newParams.has("p")) newParams.set("p", 1)
      if (!newParams.has("s")) newParams.set("s", "id:asc")
      if (!newParams.has("limit")) newParams.set("limit", 30)
      if (!newParams.has("foundIn")) newParams.set("foundIn", ["Regular", "Promo"])

      setSearchParams(newParams)
    }
  }, [searchParams, setSearchParams])
  
  // Loading screen for Filters sync
  if (optionsError) {
    return <div>Error: {optionsError}</div>;
  }
  if (!filterOptions || optionsLoading) {
    return <div>Initializing data...</div>;
  }

  // Loading screen for Cards sync
  if (error) {
   return <div>Error: {error}</div>
  };
  if (isLoading) {
    return <div>Loading cards...</div>
  };

  return (
    <>
      <ControlBar totalPages={totalPages} totalCards={totalCards} isLoading={isLoading}/>

      <div className="card-list">
        {filteredCards.length > 0 ? (
          filteredCards.map((cardname, index) => {
            return (
              <CardRenderer cardname={cardname} key={cardname.cardIDs[0] + index}/>
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