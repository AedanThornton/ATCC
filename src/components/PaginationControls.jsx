import React from "react";

const PaginationControls = ({currentPage, isLoading, totalPages, totalCards, onPageChange}) => {
  return (
    <div className="card-list__control-bar--page-buttons">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        &lt;
      </button>

      <div>
        <span>
          Page
          <input
            type="text"
            value={currentPage}
            onChange={(e) => onPageChange(e.target.value)}
            className="card-list__control-bar--page_number"
          />
          of {totalPages}<br/>
          ({totalCards} cards)
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
      >
        &gt;
      </button>

    </div>
  )
};

export default PaginationControls;