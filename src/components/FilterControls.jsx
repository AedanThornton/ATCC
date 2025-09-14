const DropdownCheckbox = ({ title, options, filters, onFilterChange, onCheckAll }) => {
  const allChecked = filters.length === options.length && options.length > 0;  

  return (
    <div className="filter-dropdown">
      <button className="filter-dropdown-button">
        {title}
      </button>

      <div className="dropdown-list">
        <label key={title} className="dropdown-list-item">
          <input
            type="checkbox"
            name="All"
            checked={allChecked}
            onChange={() => {onCheckAll(!allChecked)}}
          />
          All
        </label>
        {options.map((option, index) => (
          <label key={index} className="dropdown-list-item">
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

    </div>
  );
};

const FilterControls = ({ currentFilters, onFilterChange, filterOptions, onCheckAll }) => {
  return (
    <div className="dropdowns">
      <DropdownCheckbox title={"Card Type"}
        options={filterOptions.cardType}
        filters={currentFilters.cardType}
        onFilterChange={(option) => onFilterChange("cardType", option)}
        onCheckAll={(shouldCheckAll) => onCheckAll("cardType", shouldCheckAll)}
      />
      <DropdownCheckbox title={"Cycle"} 
        options={filterOptions.cycle} 
        filters={currentFilters.cycle} 
        onFilterChange={(option) => onFilterChange("cycle", option)} 
        onCheckAll={(shouldCheckAll) => onCheckAll("cycle", shouldCheckAll)} 
      />
      <DropdownCheckbox title={"Card Size"} 
        options={filterOptions.cardSize} 
        filters={currentFilters.cardSize} 
        onFilterChange={(option) => onFilterChange("cardSize", option)} 
        onCheckAll={(shouldCheckAll) => onCheckAll("cardSize", shouldCheckAll)} 
      />
      <DropdownCheckbox title={"Found in"} 
        options={filterOptions.foundIn} 
        filters={currentFilters.foundIn} 
        onFilterChange={(option) => onFilterChange("foundIn", option)} 
        onCheckAll={(shouldCheckAll) => onCheckAll("foundIn", shouldCheckAll)} 
      />
    </div>
  )
}

export default FilterControls;
