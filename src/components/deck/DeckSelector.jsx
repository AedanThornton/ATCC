const DeckSelector = ({ activeCardPool, setActiveCardPool }) => {
  return (
    <div className="deck-page_card-pool-selector">
      <button className="deck-page_card-pool-selector_action-button"
        onClick={() => setActiveCardPool("deck")}
        disabled={activeCardPool === "deck"}
      >
        Deck
      </button>
      <button className="deck-page_card-pool-selector_action-button"
        onClick={() => setActiveCardPool("discard")}
        disabled={activeCardPool === "discard"}
      >
        Discard
      </button>
      <button className="deck-page_card-pool-selector_action-button"
        onClick={() => setActiveCardPool("removed")}
        disabled={activeCardPool === "removed"}
      >
        Removed
      </button>
    </div>
  )
}

export default DeckSelector