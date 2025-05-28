import React, { useState } from "react";

const DropdownCheckbox = ({ title, options, filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const allChecked = filters.length === options.length && options.length > 0;

  const handleCheckAll = () => {
    if (allChecked) {
      // Uncheck all
      options.forEach((option) => filters.includes(option) && onFilterChange(option));
    } else {
      // Check all
      options.forEach((option) => !filters.includes(option) && onFilterChange(option));
    }    
  };
    
  return (
    <div className="filter-dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="filter-dropdown-button" style={{borderRadius: `10px 10px ${!isOpen ? "10px 10px" : "0 0"}`}}>
        {title} {isOpen ? "▲" : "▼"}
      </button>

      {isOpen && (
        <div className="dropdown-list">
          <label key={title} style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              name="All"
              checked={allChecked}
              onChange={handleCheckAll}
            />
            All
          </label>
          {options.map((option, index) => (
            <label key={index} style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="checkbox"
                name={option}
                checked={filters.includes(option)}
                onChange={() => onFilterChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterControls = ({currentFilters, onFilterChange, filterOptions}) => {  
  return (
    <div className="dropdowns">
      <DropdownCheckbox title={"Card Type"} options={filterOptions.cardType} filters={currentFilters.cardType} onFilterChange={(option) => onFilterChange("cardType", option)}/>
      <DropdownCheckbox title={"Cycle"} options={filterOptions.cycle} filters={currentFilters.cycle} onFilterChange={(option) => onFilterChange("cycle", option)}/>
      <DropdownCheckbox title={"Card Size"} options={filterOptions.cardSize} filters={currentFilters.cardSize} onFilterChange={(option) => onFilterChange("cardSize", option)}/>
      <DropdownCheckbox title={"Found in"} options={filterOptions.foundIn} filters={currentFilters.foundIn} onFilterChange={(option) => onFilterChange("foundIn", option)}/>
    </div>
  )
}
  
export default FilterControls;
  