import Tippy from '@tippyjs/react';
import { React, useState } from "react";

const sortSuggestions = [
  { label: "Name (Asc)", value: "name:asc"},
  { label: "Name (Desc)", value: "name:desc"},
  { label: "ID (Asc)", value: "id:asc"},
  { label: "ID (Desc)", value: "id:desc"},
];

const PaginationControls = ({sortTerm, onSortChange}) => {
  const [showSortOptions, setShowSortOption] = useState(false)

  const handleSuggestionClick = (value) => {
    onSortChange(value);
    setShowSortOption(false);
  };

  const toggleSortOptions = () => {
    setShowSortOption(!showSortOptions);
  };

  return (
    <div className="card-list__control-bar--search-wrapper">
      <input
        type="text"
        placeholder="Sort by..."
        value={sortTerm}
        onChange={(e) => onSortChange(e.target.value)}
        onFocus={toggleSortOptions}
        style={{ padding: "5px", display: "border-box" }}
        className="card-list__control-bar--sort-search"
      />
      {showSortOptions && (
        <ul className="sort-suggestions-list">
          {sortSuggestions.map((option) => (
            <Tippy
              key={option.value}
              interactive 
              duration={0} 
              offset={[-15,-20]}
              appendTo={document.body}
              placement="right-end"
              content={
              <span style={{backgroundColor: "black", color: "gray", padding: "2px 3px", borderRadius: "5px", fontSize: "12px"}}>
                {option.value}
              </span>
            }>
              <li
                onClick={() => handleSuggestionClick(option.value)}
              >
                <span className="tooltip-trigger"> {option.label} </span>
              </li>
            </Tippy>
          ))}
        </ul>
      )}
    </div>
  )
};

export default PaginationControls;