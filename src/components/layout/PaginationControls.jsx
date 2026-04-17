import React from "react";

const PaginationControls = ({currentPage, isLoading, totalPages, totalCards, onPageChange}) => {
  const isNotMobile = window.matchMedia('(hover: hover)').matches;

  return (
    <div className="card-list__control-bar--page-buttons">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        &lt;
      </button>

      <span>
        Page
        {isNotMobile 
         ? <input
            type="text"
            value={currentPage}
            onChange={(e) => onPageChange(e.target.value)}
            className="card-list__control-bar--page_number"
          />
          : <><br /><span>{` ${currentPage} `}</span></>}
        of {totalPages}
        {isNotMobile && <><br/><span>({totalCards} cards)</span></>}
      </span>

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