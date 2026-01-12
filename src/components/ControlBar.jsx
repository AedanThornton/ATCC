import PaginationControls from "./PaginationControls";
import SortControls from "./SortControls";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";

const ControlBar = ({totalPages, totalCards, isLoading}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTermUI, setSearchTermUI] = useState(searchParams.get("q") || "");
  const [debouncedSearchTerm] = useDebounce(searchTermUI, 300);

  const currentPage = parseInt(searchParams.get('p')) || 1;
  const sortTerm = searchParams.get("s") || "id:asc";

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

  //Helper functions
  const handlePageChange = (pageNumber) => {
    const newPage = Math.max(1, Math.min(totalPages || 1, Number(pageNumber)));
    const params = new URLSearchParams(searchParams);
    params.set("p", newPage)
    setSearchParams(params, { replace: true })
  };

  const handleSortTermChange = (newTerm) => {
    const params = new URLSearchParams(searchParams);
    params.set("s", newTerm)
    params.set("p", 1)
    setSearchParams(params, { replace: true })
  }

  const handleSearchChange = (newTerm) => {
    setSearchTermUI(newTerm, { replace: true })
  };

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

  return (
    <div className="card-list__control-bar">
      <div style={{ flex: 1 }}></div>

      {/* Search Bar Input */}
      <input
        type="text"
        placeholder="Search Catalog..."
        value={searchTermUI}
        onChange={(e) => handleSearchChange(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "60vw" }}
      />

      <div className="card-list__control-bar--page-contols">
        <SortControls sortTerm={sortTerm} onSortChange={handleSortTermChange} />
        <PaginationControls currentPage={currentPage} isLoading={isLoading} totalPages={totalPages} totalCards={totalCards} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}

export default ControlBar