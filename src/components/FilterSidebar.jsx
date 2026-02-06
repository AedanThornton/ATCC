import { useMemo, useState } from "react"
import { useFilterOptions } from "../hooks/useFilterOptions";
import { useSearchParams } from "react-router-dom";
import { useSpoilers } from "../context/SpoilerContext";

const RenderTieredFilters = ({ options, clickFunc, filters, depth }) => {
  return (
    <div>
      {options.map((option, i) => (
        <div key={`${option.label}-${i}`}>
          {option.children ? (
            <FilterList title={option.label} options={option.children} filters={filters} onFilterChange={clickFunc} depth={depth + 1} />
          ) : (
            <div style={{ marginLeft: depth * 24 }}>
              <FilterOptionButton option={option.value} clickFunc={clickFunc} filters={filters} />
            </div>
          )}
        </div>
      ))}
    </div>
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
          backgroundColor: filters.length ? "var(--accent-dark)" : "var(--main)"
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

      {isOpen && <div className="filters-list" style={{ backgroundColor: depth > 0 && "var(--main)" }}>
        {isObj
          ? <RenderTieredFilters options={options} clickFunc={onFilterChange} filters={filters} depth={depth} />
          : options.map((option, index) =>
            <FilterOptionButton option={option} clickFunc={onFilterChange} filters={filters} index={index} />
          )
        }
      </div>}
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

  const toggleCategory = (category) => {
    const params = new URLSearchParams(searchParams);
    const isObjList = typeof filterOptions[category][0] === "object"
    const getAllValues = (nodes) =>
      nodes.flatMap(n =>
        n.children ? getAllValues(n.children) : [n.value]
      );
    const allFilters = isObjList ? getAllValues(filterOptions[category]) : filterOptions[category]

    if (params.get(category)?.split(",").length === filterOptions[category]?.length || params.get(category)?.split(",").length === getAllValues(filterOptions[category]).length) {
      params.delete(category)
    } else {
      params.set(category, allFilters)
    }
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
                <FilterList title="Card Type" options={filterOptions.cardType} filters={currentFilters.cardType} onFilterChange={(option) => handleFilterChange("cardType", option)} onToggleCategory={() => toggleCategory("cardType")} />
                <FilterList title="Cycle" options={filterOptions.cycle} filters={currentFilters.cycle} onFilterChange={(option) => handleFilterChange("cycle", option)} onToggleCategory={() => toggleCategory("cycle")} />
                <FilterList title="Card Size" options={filterOptions.cardSize} filters={currentFilters.cardSize} onFilterChange={(option) => handleFilterChange("cardSize", option)} onToggleCategory={() => toggleCategory("cardSize")} />
                <FilterList title="Found In" options={filterOptions.foundIn} filters={currentFilters.foundIn} onFilterChange={(option) => handleFilterChange("foundIn", option)} onToggleCategory={() => toggleCategory("foundIn")} />
              </>)
        }
      </div>

    </div>
  )
}

export default FilterSidebar