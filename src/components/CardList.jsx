import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SecretOverlay from "./utils/secretUtils";
import FilterControls from "./FilterControls";

import GearCard from "./GearCard/GearCard";
import ArgonautCard from "./ArgonautCard/ArgonautCard";
import PatternCard from "./PatternCard/PatternCard";
import TitanCard from "./TitanCard/TitanCard";
import AttackCard from "./AttackCard/AttackCard";
import ProductionFacilityCard from "./ProductionFacilityCard/ProductionFacilityCard";

const CardList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({});
  const [currentFilters, setCurrentFilters] = useState({
    cardType: [],
    cycle: [],
    cardSize: [],
    usedFor: [],});
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const [error, setError] = useState(null);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      setOptionsLoading(true);
      setOptionsError(null);

      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/filter-options`;      

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const optionsData = await response.json();

        // --- Set the INITIAL filters state (all selected by default) ---
        setFilterOptions({
            cardType: optionsData.cardTypes || [],
            cycle: optionsData.cycles || [],
            cardSize: optionsData.cardSizes || [],
            usedFor: [undefined, "Promo", ...optionsData.usedFors],
        });

        const params = new URLSearchParams(window.location.search);

        // Change initial state based on URL
        if (params.get('q')) setSearchTerm(params.get('q'));
        
        // --- Set the INITIAL filters state (based on URL) ---
        setCurrentFilters({
            cardType: params.get('cardType') ? params.get('cardType').split(",") : [...optionsData.cardTypes],
            cycle: params.get('cycle') ? params.get('cycle').split(",") : [...optionsData.cycles],
            cardSize: params.get('cardSize') ? params.get('cardSize').split(",") : [...optionsData.cardSizes],
            usedFor: [undefined, "Promo"],
        });
      } catch (e) {
          console.error("Error fetching filter options:", e);
          setOptionsError("Could not load filter options.");
          setCurrentFilters({}); // Set to empty object on error? Or null?
      } finally {
          setOptionsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const configureURLParameters = () => {
    const params = new URLSearchParams();    
    if (searchTerm) params.append('q', searchTerm);
    if (currentFilters.cardType && filterOptions.cardType && currentFilters.cardType.length !== filterOptions.cardType.length) params.set("cardType", currentFilters.cardType)
    if (currentFilters.cycle && filterOptions.cycle && currentFilters.cycle.length !== filterOptions.cycle.length) params.set("cycle", currentFilters.cycle)
    if (currentFilters.cardSize && filterOptions.cardSize && currentFilters.cardSize.length !== filterOptions.cardSize.length) params.set("cardSize", currentFilters.cardSize)
    //if (filters["usedFor"] == [undefined, "Promo"]) params.set("usedFor", filters["usedFor"])

    return params
  }

  // --- API Fetching Function (using useCallback) ---
  const fetchCards = useCallback(async () => {
    setIsLoading(true); // Set loading true when fetch starts
    setError(null);

    // IMPORTANT: Use the *current state* variables here
    let params = configureURLParameters()
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/cards?${params.toString()}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFilteredCards(data);
    } catch (e) {
        console.error("Error fetching cards:", e);
        setError(e.message);
        setFilteredCards([]);
    } finally {
        setIsLoading(false); // Set loading false when fetch finishes (success or error)
    }
  }, [currentFilters, searchTerm]);

  // --- Effect to Fetch Data (Depends on Filters) ---
  // This runs on mount AND whenever filter state changes
  useEffect(() => {
    console.log("Filters changed or initial load done, fetching data...");
    updateUrlParams();
    fetchCards();
  }, [fetchCards]);

  // Update Filters based on boxes checked in dropdowns
  const handleFilterChange = (category, option) => {
    setCurrentFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(option)
        ? prevFilters[category].filter((item) => item !== option) // Remove if already selected
        : [...prevFilters[category], option], // Add if not selected
    }));
  };
  
  // --- Function to Update Browser URL Bar ---
  const updateUrlParams = () => {
      let params = configureURLParameters()
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
  };
  
  // Showing loading screen while waiting for sync
  if (optionsError) {
    return <div>Error: {optionsError}</div>;
  }
  if (!currentFilters || !filterOptions || optionsLoading) {
     return <div>Initializing data...</div>;
  }

  return (
    <>
      {/* Search Bar Input */}
      <input
        type="text"
        placeholder="Search Catalog..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "60vw" }}
      />

      {/* Render and Handle search filters */}
      <FilterControls currentFilters={currentFilters} onFilterChange={handleFilterChange} filterOptions={filterOptions} />

      {/* Render Filtered Card List */}
      {isLoading && <div>Loading cards...</div>}
      {error && <div>Error: {cardsError}</div>}
      {!isLoading && !error && (
        <div className="card-list">
          {filteredCards.length > 0 ? (
            filteredCards.map((cardname, index) => {
              const cardTypes = {
                "Argonaut": (name) => <ArgonautCard key={name.cardIDs} argonaut={name} />,
                "Gear": (name) => <GearCard key={name.cardIDs[0]} gear={name} />,
                "Pattern": (name) => <PatternCard key={name.cardIDs[0]} pattern={name} />,
                "Titan": (name) => <TitanCard key={name.cardIDs[0]} titan={name} />,
                "Attack": (name) => <AttackCard key={name.cardIDs[0]} attack={name} />,
                "Technology": (name) => {
                  const techSubType = {
                    "Production Facility": <ProductionFacilityCard key={name.cardIDs[0]} productionFacility={name} />,
                    //"Argo Ability": <ArgoAbilityCard key={name.cardIDs[0]} productionFacility={name} />,
                    //"Core": <ProductionFacilityCard key={name.cardIDs[0]} productionFacility={name} />,
                  }
                  const techType = {
                    "Combat": techSubType[name.techSubType] || <></>,
                    //"Structural": <ProductionFacilityCard key={name.cardIDs[0]} productionFacility={name} />,
                  }

                  return techType[name.techType] || <></>;
                }
              };

              const currentCard = cardTypes[cardname.cardType]?.(cardname) || null;
              const secretOverlay = <>{
                (cardname.usedFor?.includes("Secret Deck") || cardname.usedFor?.includes("Envelope"))
                && <SecretOverlay text={cardname.usedFor} key={index + "cover"} />
              }</>

              return (
                <div key={index} style={{ position: "relative" }}>
                  {secretOverlay}
                  <Link to={`/card/${cardname.cardIDs[0]}`}>
                    {currentCard}
                    <div className="card-type-marker" style={{ backgroundColor: "#666" }}>
                      {cardname.cardType}
                    </div>
                  </Link>
                </div>
              )
            })
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default CardList;