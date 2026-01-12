import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

//Search Bar Input
const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTermUI, setSearchTermUI] = useState(searchParams.get("q") || "");
  const [debouncedSearchTerm] = useDebounce(searchTermUI, 300);

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

  const handleSearchChange = (newTerm) => {
    setSearchTermUI(newTerm, { replace: true })
  };

  return (
    <input
      type="text"
      placeholder="Search Catalog..."
      value={searchTermUI}
      onChange={(e) => handleSearchChange(e.target.value)}
      className="card-search-bar"
    />
  )
}

export default SearchBar