import { useMemo, useState } from "react"
import { useFilterOptions } from "../hooks/useFilterOptions";
import { useSearchParams } from "react-router-dom";
import { useSpoilers } from "../context/SpoilerContext";

const getAllValues = (nodes) =>
  nodes.flatMap(n =>
    n.children ? getAllValues(n.children) : [n.value]
  );

const RenderTieredFilters = ({ options, clickFunc, onToggleCategory, filters, depth }) => {
  return (
    <>
      {options.map((option, i) => (
        <div key={`${option.label}-${i}`}>
          {option.children ? (
            <FilterList 
              title={option.label}
              options={option.children}
              filters={filters}
              onFilterChange={clickFunc}
              depth={depth + 1}
              onToggleCategory={() => onToggleCategory(getAllValues(option.children))}
            />
          ) : (
            <div style={{ marginLeft: depth * 24 }}>
              <FilterOptionButton option={option.value} clickFunc={clickFunc} filters={filters} />
            </div>
          )}
        </div>
      ))}
    </>
  )
}

const FilterOptionButton = ({ option, clickFunc, filters, index }) => {
  return (
    <button
      key={index}
      className={`dropdown-list-item ${filters.includes(option) ? 'dropdown-list-item__selected' : ""}`}
      onClick={() => clickFunc(option)}
    >
      {option}
    </button>
  )
}

const FilterList = ({ title, options, filters, onFilterChange, depth = 0, onToggleCategory }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isObj = typeof (options[0]) === "object"
  const ref = new Set(options.map(item => item.value));

  return (
    <>
      <div
        className="dropdown-container"
        style={{
          backgroundColor: filters.length ? "var(--accent-dark)" : (depth ? "var(--main-light)" : "var(--main)")
        }}
      >
        <label className="dropdown-select-box">
          <input type="checkbox" checked={filters.length === options.length} onChange={onToggleCategory} />
          <span className="dropdown-select-box-radio" />
        </label>
        
        <button
          className={`dropdown-button ${depth > 0 && "dropdown-list-item"}`}
          onClick={() => setIsOpen(!isOpen)}
          style={{ backgroundColor: "unset" }}
        >
          <h3 style={{ margin: depth > 0 && 0 }}>
            {title} (<span>{depth > 0 ? filters.filter(item => ref.has(item)).length : filters.length}</span>)
          </h3>

          {isOpen ? "▽" : "△"}
        </button>
      </div>

      <div className={`filters-list ${isOpen ? "open" : ""} ${depth > 0 ? "deep" : ""}`}
        style={{
          gridTemplateRows: `repeat(${Math.ceil(options.length / 2)}, auto)`,
        }}
      >
        {isObj
          ? <RenderTieredFilters options={options} clickFunc={onFilterChange} onToggleCategory={onToggleCategory} filters={filters} depth={depth} />
          : options.map((option, index) =>
            <FilterOptionButton option={option} clickFunc={onFilterChange} filters={filters} index={index} />
          )
        }
      </div>
    </>
  )
}

const FilterSidebar = () => {
  const { spoilersEnabled, setSpoilersEnabled } = useSpoilers();

  const [searchParams, setSearchParams] = useSearchParams();

  const { filterOptions, optionsLoading, optionsError } = useFilterOptions();

  const currentFilters = useMemo(() => {
    if (!filterOptions) return null;
    return {
      cardType: searchParams.get('cardType')?.split(',') || [],
      cycle: searchParams.get('cycle')?.split(',') || [],
      cardSize: searchParams.get('cardSize')?.split(',') || [],
      foundIn: searchParams.get('foundIn')?.split(',') || [],
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
    setSearchParams(params, { replace: true })
  };

  const toggleCategory = (category, whitelist) => {
    whitelist = Array.isArray(whitelist) ? whitelist : [];
    const params = new URLSearchParams(searchParams);
    const isObjList = typeof filterOptions[category][0] === "object";
    const allFilters = isObjList ? getAllValues(filterOptions[category]) : filterOptions[category];
    const currentFilters = new Set(params.get(category)?.split(","))

    console.log(allFilters, currentFilters);
    

    if ((whitelist && whitelist.length > 0 && whitelist.every(item => currentFilters.has(item))) || allFilters.every(item => currentFilters.has(item))) {
      (whitelist && whitelist.length > 0) 
        ? params.set(category, [...currentFilters].filter((filter) => !whitelist.includes(filter))) 
        : params.delete(category)
    } else {
      (whitelist && whitelist.length > 0) 
        ? params.set(category, [...new Set([...allFilters.filter((filter) => whitelist.includes(filter)), ...currentFilters])]) 
        : params.set(category, allFilters)
    }

    if (params.get(category)?.split(",").length === 1 && params.get(category)?.split(",")[0] === '') params.delete(category)

    setSearchParams(params, { replace: true })
  }

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("cardType")
    params.delete("cycle")
    params.delete("cardSize")
    params.delete("foundIn")
    setSearchParams(params, { replace: true })
  }

  return (
    <div className="filter-sidebar">
      <h1>Filters</h1>

      <div className="filter-controls">
        Hide Secrets
        <label className="filters-switch">
          <input type="checkbox" checked={spoilersEnabled} onChange={() => setSpoilersEnabled(!spoilersEnabled)} />
          <span className="filters-slider" />
        </label>
      </div>

      <div className="filters-container">
        {
          optionsError
            ? <div>Error: {optionsError}</div>
            :
            (!filterOptions || optionsLoading)
              ? <div>Initializing data...</div>
              :
              (<>
                <FilterList title="Card Type" 
                  options={filterOptions.cardType}
                  filters={currentFilters.cardType}
                  onFilterChange={(option) => handleFilterChange("cardType", option)}
                  onToggleCategory={(whitelist) => toggleCategory("cardType", whitelist)}
                />
                <FilterList title="Cycle"
                  options={filterOptions.cycle}
                  filters={currentFilters.cycle}
                  onFilterChange={(option) => handleFilterChange("cycle", option)}
                  onToggleCategory={(whitelist) => toggleCategory("cycle", whitelist)}
                />
                <FilterList title="Card Size"
                  options={filterOptions.cardSize}
                  filters={currentFilters.cardSize}
                  onFilterChange={(option) => handleFilterChange("cardSize", option)}
                  onToggleCategory={(whitelist) => toggleCategory("cardSize", whitelist)}
                />
                <FilterList title="Found In"
                  options={filterOptions.foundIn}
                  filters={currentFilters.foundIn}
                  onFilterChange={(option) => handleFilterChange("foundIn", option)}
                  onToggleCategory={(whitelist) => toggleCategory("foundIn", whitelist)}
                />
              </>)
        }
      </div>

    </div>
  )
}

export default FilterSidebar