import { useMemo } from "react"
import { useFilterOptions } from "../hooks/useFilterOptions";
import { useSearchParams } from "react-router-dom";

const FilterList = ({ title, options, filters, onFilterChange }) => {
  return (
    <>
      <h3>{title}</h3>
      <div className="filters-list">
        {options.map((option, index) => <button
          key={index}
          className={`dropdown-list-item ${filters.includes(option) && 'dropdown-list-item__selected'}`}
          onClick={() => onFilterChange(option)}
        >
          {option}
        </button>)}
      </div>
    </>
  )
}

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { filterOptions, optionsLoading, optionsError } = useFilterOptions();
  
  const currentFilters = useMemo(() => {
    if (!filterOptions) return null;
    return {
      cardType: searchParams.get('cardType')?.split(',') || [],
      cycle: searchParams.get('cycle')?.split(',') || [],
      cardSize: searchParams.get('cardSize')?.split(',') || [],
      foundIn: searchParams.get('foundIn')?.split(',') || ["Regular", "Promo"],
    };
  }, [searchParams, filterOptions]);

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

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("cardType")
    params.delete("cycle")
    params.delete("cardSize")
    params.delete("foundIn")
    setSearchParams(params, {replace: true})
  }

  // Showing loading screen while waiting for sync
  if (optionsError) {
    return <div>Error: {optionsError}</div>;
  }
  if (!filterOptions || optionsLoading) {
    return <div>Initializing data...</div>;
  }

  return (
    <div className="filter-sidebar">

      <h1>Filters</h1>
      <FilterList title="Card Type" options={filterOptions.cardType} filters={currentFilters.cardType} onFilterChange={(option) => handleFilterChange("cardType", option)} />
      <FilterList title="Cycle" options={filterOptions.cycle} filters={currentFilters.cycle} onFilterChange={(option) => handleFilterChange("cycle", option)} />
      <FilterList title="Card Size" options={filterOptions.cardSize} filters={currentFilters.cardSize} onFilterChange={(option) => handleFilterChange("cardSize", option)} />
      <FilterList title="Found In" options={filterOptions.foundIn} filters={currentFilters.foundIn} onFilterChange={(option) => handleFilterChange("foundIn", option)} />

    </div>
  )
}

export default FilterSidebar