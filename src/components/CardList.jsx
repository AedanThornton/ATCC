import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import FilterControls from "./FilterControls";
import PaginationControls from "./PaginationControls";
import SortControls from "./SortControls";
import "../styles/cardlist.css";
import CardGrid from "./CardGrid";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { useCards } from "../hooks/useCards";

const CardList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  //Search states
  const [searchTermUI, setSearchTermUI] = useState(searchParams.get("q") || "");
  const [debouncedSearchTerm] = useDebounce(searchTermUI, 300);

  //Response values from API
  const { filterOptions, optionsLoading, optionsError } = useFilterOptions();
  const { filteredCards, totalPages, totalCards, isLoading, error } = useCards(searchParams);

  const currentPage = parseInt(searchParams.get('p')) || 1;
  const sortTerm = searchParams.get("s") || "id:asc";

  const currentFilters = useMemo(() => {
    if (!filterOptions) return null;
    return {
      cardType: searchParams.get('cardType')?.split(',') || [],
      cycle: searchParams.get('cycle')?.split(',') || [],
      cardSize: searchParams.get('cardSize')?.split(',') || [],
      foundIn: searchParams.get('foundIn')?.split(',') || ["Regular", "Promo"],
    };
  }, [searchParams, filterOptions]);

  //Setup debounce
  useEffect(() => {
    // Avoid running on initial mount if search terms match
    if (debouncedSearchTerm === (searchParams.get('q') || '')) {
      return;
    }

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

    setSearchParams(newParams, { replace: true });
  }, [debouncedSearchTerm]);


  // Set Initial params if missing
  useEffect(() => {
    if (!searchParams.has("p") || !searchParams.has("s") || !searchParams.has("limit")){
      const newParams = new URLSearchParams(searchParams)

      if (!newParams.has("p")) newParams.set("p", 1)
      if (!newParams.has("s")) newParams.set("s", "id:asc")
      if (!newParams.has("limit")) newParams.set("limit", 30)
      if (!newParams.has("foundIn")) newParams.set("foundIn", ["Regular", "Promo"])

      setSearchParams(newParams)
    }
  }, [searchParams, setSearchParams])

  // Update Filters based on boxes checked in dropdowns
  const handleFilterChange = (category, option) => {
    const currentCategoryValues = currentFilters[category]

    //Update UI state
    const isSelected = currentCategoryValues.includes(option)
    const newCategoryValues = isSelected
        ? currentCategoryValues.filter((item) => item !== option) // Remove if already selected
        : [...currentCategoryValues, option]; // Add if not selected

    //Update URL and data state
    const params = new URLSearchParams(searchParams)
    if (newCategoryValues.length > 0 && newCategoryValues.length < filterOptions[category]?.length) {
      params.set(category, newCategoryValues.join(','));
    } else {
      params.delete(category);
    }
    params.set("p", 1)
    setSearchParams(params, {replace: true})
  };

  const handleSearchChange = (newTerm) => {
    setSearchTermUI(newTerm, {replace: true})
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

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("cardType")
    params.delete("cycle")
    params.delete("cardSize")
    params.delete("foundIn")
    setSearchParams(params, {replace: true})
  }

  const addCardReference = (newCard, resetFilters = true, previousCard) => {
    const searchReference = () => {
      resetFilters && resetFilters()
      handleSearchChange(previousCard ? newCard + " || " + previousCard : newCard)
    }

    return (
      <a onClick={() => searchReference()}>
        {newCard}
      </a>
    )
  }
  
  // Showing loading screen while waiting for sync
  if (optionsError) {
    return <div>Error: {optionsError}</div>;
  }
  if (!filterOptions || optionsLoading) {
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
        <FilterControls currentFilters={currentFilters} onFilterChange={handleFilterChange} filterOptions={filterOptions} resetFilters={() => resetFilters()}/>
        <div className="card-list__control-bar--page-contols">
          <SortControls sortTerm={sortTerm} onSortChange={handleSortTermChange}/>
          <PaginationControls currentPage={currentPage} isLoading={isLoading} totalPages={totalPages} totalCards={totalCards} onPageChange={handlePageChange}/>
        </div>
      </div>

      {/* Render Filtered Card List */}
      <CardGrid isLoading={isLoading} error={error} filteredCards={filteredCards} />
    </>
  );
};

export default CardList;