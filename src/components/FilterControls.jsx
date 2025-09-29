const DropdownCheckbox = ({ title, options, filters, onFilterChange }) => {
  return (
    <div className="filter-dropdown">
      <button className="filter-dropdown-button">
        {title}
      </button>

      <div className="dropdown-list">
        {options.map((option, index) => (
          <button 
            key={index}
            className={`dropdown-list-item ${filters.includes(option) && 'dropdown-list-item__selected'}`}
            onClick={() => onFilterChange(option)}
          >
            {option}
          </button>
        ))}
      </div>

    </div>
  );
};

const FilterControls = ({ currentFilters, onFilterChange, filterOptions, resetFilters }) => {
  return (
    <div className="dropdowns">
      <DropdownCheckbox title={"Card Type"}
        options={filterOptions.cardType}
        filters={currentFilters.cardType}
        onFilterChange={(option) => onFilterChange("cardType", option)}
      />
      <DropdownCheckbox title={"Cycle"} 
        options={filterOptions.cycle} 
        filters={currentFilters.cycle} 
        onFilterChange={(option) => onFilterChange("cycle", option)} 
      />
      <DropdownCheckbox title={"Card Size"} 
        options={filterOptions.cardSize} 
        filters={currentFilters.cardSize} 
        onFilterChange={(option) => onFilterChange("cardSize", option)} 
      />
      <DropdownCheckbox title={"Found in"} 
        options={filterOptions.foundIn} 
        filters={currentFilters.foundIn} 
        onFilterChange={(option) => onFilterChange("foundIn", option)} 
      />
      <button
        onClick={resetFilters}
        className="filter-reset-button"
      >
        Reset
      </button>
    </div>
  )
}

export default FilterControls;
