import { useRef, useState } from "react";

const SearchableList = ({ items, onItemClick, onSearchEnter, customPlaceholder, customEmptyMsg }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTermUI, setSearchTermUI] = useState("");
  
  const searchableListRef = useRef(null);

  const handleSearchUpdate = (term) => {
    if (term.length > 20) {
      term = term.slice(0, 20);
    }

    setSearchTermUI(term);
  }

  const handleDropdownSelect = (setName) => {
    setSearchTermUI(setName);
    setShowDropdown(false);
    onItemClick(setName);
  }

  
  return <div className="searchable-list-wrapper" onMouseLeave={() => setShowDropdown(false)}>
    <input
      type="text"
      ref={searchableListRef}
      placeholder={customPlaceholder ? customPlaceholder : ""}
      value={searchTermUI}
      onChange={(e) => handleSearchUpdate(e.target.value)}
      onMouseEnter={() => setShowDropdown(true)}
      onBlur={() => setShowDropdown(false)}
      className="searchable-list-search-bar"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearchEnter(searchTermUI)
        }
      }}
    />

    {showDropdown && (
      <div className="searchable-list-dropdown" style={{ width: searchableListRef.current.offsetWidth }}>
        {items.length === 0 && <div className="searchable-list-item">{customEmptyMsg ? customEmptyMsg : "Nothing to display..."}</div>}
        {items.map((item) => {
          if (!item.name.toLowerCase().includes(searchTermUI.toLowerCase())) return null;
          return <div className="searchable-list-item" key={item.id} onClick={() => handleDropdownSelect(item.id)}>
            {item.name}
          </div>
        })}
      </div>
    )}
  </div>
}

export default SearchableList