import React, { useState } from "react";

const DropdownCheckbox = ({ title, options, filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);  
    
  return (
    <div className="filter-dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="filter-dropdown-button" style={{borderRadius: `10px 10px ${!isOpen ? "10px 10px" : "0 0"}`}}>
        {title} {isOpen ? "▲" : "▼"}
      </button>

      {isOpen && (
        <div className="dropdown-list">
          {options.map((option, index) => (
            <label key={index} style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="checkbox"
                name={option}
                checked={filters.includes(option)}
                onChange={() => onFilterChange(option)}
              />
              {option === undefined ? "Unspecified" : option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterControls = ({filters, onFilterChange, fullCardList}) => {
    const cardTypes = [...new Set(fullCardList.map(card => card.cardType))];
    const cycles = [...new Set(fullCardList.map(card => card.cycle))];
    const cardSizes = [...new Set(fullCardList.map(card => card.cardSize))];   
    const usedFors = [...new Set(fullCardList.map(card => card.usedFor))];    

    return (
        <div className="dropdowns">
            <DropdownCheckbox title={"Card Type"} options={cardTypes} filters={filters.cardType} onFilterChange={(option) => onFilterChange("cardType", option)}/>
            <DropdownCheckbox title={"Cycle"} options={cycles} filters={filters.cycle} onFilterChange={(option) => onFilterChange("cycle", option)}/>
            <DropdownCheckbox title={"Card Size"} options={cardSizes} filters={filters.cardSize} onFilterChange={(option) => onFilterChange("cardSize", option)}/>
            <DropdownCheckbox title={"Found in"} options={usedFors} filters={filters.usedFor} onFilterChange={(option) => onFilterChange("usedFor", option)}/>
        </div>
    )
}
  
export default FilterControls;
  