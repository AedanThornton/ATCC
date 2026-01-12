import PaginationControls from "./PaginationControls";
import SortControls from "./SortControls";
import { useSearchParams } from "react-router-dom";
import { useCards } from "../hooks/useCards";

const ControlBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredCards, totalPages, totalCards, isLoading, error } = useCards(searchParams);

  const currentPage = parseInt(searchParams.get('p')) || 1;
  const sortTerm = searchParams.get("s") || "id:asc";

  //Helper functions
  const handlePageChange = (pageNumber) => {
    const newPage = Math.max(1, Math.min(totalPages || 1, Number(pageNumber)));
    const params = new URLSearchParams(searchParams);
    params.set("p", newPage)
    setSearchParams(params, { replace: true })
  };

  const handleSortTermChange = (newTerm) => {
    const params = new URLSearchParams(searchParams);
    params.set("s", newTerm)
    params.set("p", 1)
    setSearchParams(params, { replace: true })
  }

  const addCardReference = (newCard, resetFilters = true, previousCard) => {
    const searchReference = () => {
      resetFilters && resetFilters()
      handleSearchChange(previousCard ? newCard + " || " + previousCard : newCard)
    }

    return (
      <a onClick={() => searchReference()}>
        {newCard}
      </a>
    )
  }

  return (
    <div className="card-list__control-bar">
      <div className="card-list__control-bar--page-contols">
        <SortControls sortTerm={sortTerm} onSortChange={handleSortTermChange} />
        <PaginationControls currentPage={currentPage} isLoading={isLoading} totalPages={totalPages} totalCards={totalCards} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}

export default ControlBar