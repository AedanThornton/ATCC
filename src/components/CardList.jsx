import React, { useState, useEffect } from "react";
import FilterControls from "./FilterControls";
import PaginationControls from "./PaginationControls";
import SortControls from "./SortControls";
import CardRenderer from "./CardRenderer";
import "../styles/cardlist.css";
import { replace, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

const CardList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('p')) || 1;
  const sortTerm = searchParams.get("s") || "id:asc";

  //Search states
  const [searchTermUI, setSearchTermUI] = useState(searchParams.get("q") || "")
  const [debouncedSearchTerm] = useDebounce(searchTermUI, 300)
  const [filterOptions, setFilterOptions] = useState({});
  const [currentFilters, setCurrentFilters] = useState({
    cardType: [],
    cycle: [],
    cardSize: [],
    foundIn: []});
  const [filteredCards, setFilteredCards] = useState([]);

  //Page states
  const [totalPages, setTotalPages] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  //Function states
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const [error, setError] = useState(null);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState(null);

  //Setup debounce
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    // Use the debounced value to update the URL
    if (debouncedSearchTerm) {
      newParams.set('q', debouncedSearchTerm);
    } else {
      newParams.delete('q');
    }

    // Only reset page if the search term has actually changed
    // This prevents resetting page on initial load
    if (debouncedSearchTerm !== (searchParams.get('q') || '')) {
       newParams.set('p', '1');
    }

    // Use replace: true to avoid polluting browser history with every keystroke
    setSearchParams(newParams, { replace: true });
  }, [debouncedSearchTerm]);

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
        
        // --- Set the INITIAL filters state (based on URL) ---
        setCurrentFilters({
            cardType: searchParams.get('cardType') ? searchParams.get('cardType').split(",") : [...optionsData.cardTypes],
            cycle: searchParams.get('cycle') ? searchParams.get('cycle').split(",") : [...optionsData.cycles],
            cardSize: searchParams.get('cardSize') ? searchParams.get('cardSize').split(",") : [...optionsData.cardSizes],
            foundIn: searchParams.get('foundIn') ? searchParams.get('foundIn').split(",") : ["Regular", "Promo"],
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

  // --- Effect to Fetch Data (Depends on Filters) ---
  // This runs on mount AND whenever filter state changes
  useEffect(() => {
    if (optionsLoading || !currentFilters) { return; }

    // --- API Fetching Function (using useCallback) ---
    const fetchCards = async () => {
      setIsLoading(true);
      setError(null);

      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/cards?${searchParams.toString()}`;

      try {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          
          setFilteredCards(data.cards);
          setTotalCards(parseInt(data.totalCards));
          setTotalPages(parseInt(data.totalPages));
      } catch (e) {
          console.error("Error fetching cards:", e);
          setError(e.message);
          setFilteredCards([]);
      } finally {
          setIsLoading(false); // Set loading false when fetch finishes (success or error)
      }
    };

    console.log("Filters changed or initial load done, fetching data...");
    fetchCards();
  }, [searchParams, currentFilters]);

  // Update Filters based on boxes checked in dropdowns
  const handleFilterChange = (category, option) => {
    const currentCategoryValues = currentFilters[category]

    //Update UI state
    const isSelected = currentCategoryValues.includes(option)
    const newCategoryValues = isSelected
        ? currentCategoryValues.filter((item) => item !== option) // Remove if already selected
        : [...currentCategoryValues, option]; // Add if not selected

    setCurrentFilters((prevFilters) => ({
      ...prevFilters,
      [category]: newCategoryValues
    }));

    //Update URL and data state
    const params = new URLSearchParams(searchParams)
    if (newCategoryValues.length > 0 && newCategoryValues.length < filterOptions[category]?.length) {
      params.set(category, newCategoryValues.join(','));
    } else {
      // If the array is empty or all items are selected, remove the parameter from the URL.
      params.delete(category);
    }
    params.set("p", 1)
    setSearchParams(params, {replace: true})
  };

  const handleSearchChange = (newTerm) => {
    setSearchTermUI(newTerm, {replace: true})
  };

  const handleCheckAll = (category, shouldCheckAll) => {
    let newCategoryValues;

    if (shouldCheckAll) {
      // Uncheck all
      newCategoryValues = [...filterOptions[category]];
    } else {
      // Check all
      newCategoryValues = [];
    }

    setCurrentFilters((prevFilters) => ({
      ...prevFilters,
      [category]: newCategoryValues
    }));

    //Update URL and data state
    const params = new URLSearchParams(searchParams)
    params.delete(category); //remove all regardless from URL because all unchecked = show everything
    params.set("p", 1)
    setSearchParams(params, {replace: true})
  };

  const handlePageChange = (pageNumber) => {
    const newPage = Math.max(1, Math.min(totalPages || 1, Number(pageNumber)));
    const params = new URLSearchParams(searchParams);
    params.set("p", newPage)
    setSearchParams(params, {replace: true})
  };

  const handleSortTermChange = (newTerm) => {
    const params = new URLSearchParams(searchParams);
    params.set("s", newTerm)
    params.set("p", 1)
    setSearchParams(params, {replace: true})
  }
  
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
        value={searchTermUI}
        onChange={(e) => handleSearchChange(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "60vw" }}
      />

      {/* Control Bar */}
      <div className="card-list__control-bar">
        <div style={{flex: 1}}></div>

        {/* Filter dropdowns */}
        <FilterControls currentFilters={currentFilters} onFilterChange={handleFilterChange} filterOptions={filterOptions} onCheckAll={handleCheckAll} />
        <div className="card-list__control-bar--page-contols">
          <SortControls sortTerm={sortTerm} onSortChange={handleSortTermChange}/>
          <PaginationControls currentPage={currentPage} isLoading={isLoading} totalPages={totalPages} totalCards={totalCards} onPageChange={handlePageChange}/>
        </div>
      </div>

      {/* Render Filtered Card List */}
      {isLoading && <div>Loading cards...</div>}
      {error && <div>Error: {error}</div>}
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