import React, { useState, useEffect, useCallback } from "react";
import FilterControls from "./FilterControls";
import PaginationControls from "./PaginationControls";
import SortControls from "./SortControls";
import CardRenderer from "./CardRenderer";
import "../styles/cardlist.css";
import { useSearchParams } from "react-router-dom";

let cardsPerPage = 30;

const CardList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  //Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({});
  const [currentFilters, setCurrentFilters] = useState({
    cardType: [],
    cycle: [],
    cardSize: [],
    foundIn: [],});
  const [filteredCards, setFilteredCards] = useState([]);

  //Page states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  //Sort states
  const [sortTerm, setSortTerm] = useState("id:asc");
  const [showSortOptions, setShowSortOption] = useState(false)

  //Function states
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const [error, setError] = useState(null);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState(null);

  //On-load render
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
            foundIn: optionsData.foundIns || [],
        });

        // Change state based on initial URL
        if (searchParams.get('q')) setSearchTerm(searchParams.get('q'));
        
        // --- Set the INITIAL filters state (based on URL) ---
        setCurrentFilters({
            cardType: searchParams.get('cardType') ? searchParams.get('cardType').split(",") : [...optionsData.cardTypes],
            cycle: searchParams.get('cycle') ? searchParams.get('cycle').split(",") : [...optionsData.cycles],
            cardSize: searchParams.get('cardSize') ? searchParams.get('cardSize').split(",") : [...optionsData.cardSizes],
            foundIn: ["Regular", "Promo"],
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
    if (currentFilters.foundIn && filterOptions.foundIn && currentFilters.foundIn.length !== filterOptions.foundIn.length) params.set("foundIn", currentFilters.foundIn)

    params.set("s", sortTerm)
    params.set("p", currentPage)
    params.set("limit", cardsPerPage)

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
        setFilteredCards(data.cards);
        setCurrentPage(parseInt(data.currentPage));
        setTotalCards(parseInt(data.totalCards));
        setTotalPages(parseInt(data.totalPages));
    } catch (e) {
        console.error("Error fetching cards:", e);
        setError(e.message);
        setFilteredCards([]);
    } finally {
        setIsLoading(false); // Set loading false when fetch finishes (success or error)
    }
  }, [currentFilters, searchTerm, currentPage, sortTerm]);

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

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSuggestionClick = (value) => {
    setSortTerm(value);
    setShowSortOption(false);
  };

  const toggleSortOptions = () => {
    setShowSortOption(!showSortOptions);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    setCurrentPage(pageNumber);
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
        onChange={(e) => handleSearchChange(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "60vw" }}
      />

      {/* Control Bar */}
      <div className="card-list__control-bar">
        <div style={{flex: 1}}></div>

        {/* Filter dropdowns */}
        <FilterControls currentFilters={currentFilters} onFilterChange={handleFilterChange} filterOptions={filterOptions} />
        <div className="card-list__control-bar--page-contols">
          <SortControls sortTerm={sortTerm} showSortOptions={showSortOptions} onSortFocus={toggleSortOptions} onSortChange={setSortTerm} onSuggestionClick={handleSuggestionClick}/>
          <PaginationControls currentPage={currentPage} isLoading={isLoading} totalPages={totalPages} totalCards={totalCards} onPageChange={handlePageChange}/>
        </div>
      </div>

      {/* Render Filtered Card List */}
      {isLoading && <div>Loading cards...</div>}
      {error && <div>Error: {cardsError}</div>}
      {!isLoading && !error && (
        <div className="card-list">
          {filteredCards.length > 0 ? (
            filteredCards.map((cardname, index) => {
              return (
                <CardRenderer cardname={cardname} key={index}/>
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