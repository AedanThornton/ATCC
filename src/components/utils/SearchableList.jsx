import { useRef, useState } from "react";

const SearchableList = ({ items = [{id: "", name: ""}], onItemClick = ()=>{}, onSearchEnter = ()=>{}, customPlaceholder = "", customEmptyMsg = "" }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTermUI, setSearchTermUI] = useState("");
  const [isEditing, setIsEditing] = useState(false)
  
  const searchableListRef = useRef(null);

  const handleSearchUpdate = (term) => {
    setIsEditing(true)
    if (term.length > 20) {
      term = term.slice(0, 20);
    }

    setSearchTermUI(term);
  }

  const handleDropdownSelect = (item) => {
    setSearchTermUI(item.name);
    setShowDropdown(false);
    onItemClick(item.id);
  }

  const handleHideDropdown = () => {
    setShowDropdown(false)
    setIsEditing(false)
  }

  
  return <div className="searchable-list-wrapper" onMouseLeave={() => handleHideDropdown()}>
    <input
      type="text"
      ref={searchableListRef}
      placeholder={customPlaceholder ? customPlaceholder : ""}
      value={searchTermUI}
      onChange={(e) => handleSearchUpdate(e.target.value)}
      onMouseEnter={() => setShowDropdown(true)}
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
          if (isEditing && !item.name.toLowerCase().includes(searchTermUI.toLowerCase())) return null;
          return <div className="searchable-list-item" key={item.id} onClick={() => handleDropdownSelect(item)}>
            {item.name}
          </div>
        })}
      </div>
    )}
  </div>
}

export default SearchableList