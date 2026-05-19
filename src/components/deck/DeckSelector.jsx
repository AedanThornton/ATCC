import { useDeckState } from "../../hooks/useDeckState"

const DeckSelector = ({ deckState }) => {
  return (
    <div className="deck-page_card-pool-selector">
      <button className="deck-page_card-pool-selector_action-button"
        onClick={() => deckState.setActiveCardPool("deck")}
        disabled={deckState.activeCardPool === "deck"}
      >
        Deck
      </button>
      <button className="deck-page_card-pool-selector_action-button"
        onClick={() => deckState.setActiveCardPool("discard")}
        disabled={deckState.activeCardPool === "discard"}
      >
        Discard
      </button>
      <button className="deck-page_card-pool-selector_action-button"
        onClick={() => deckState.setActiveCardPool("removed")}
        disabled={deckState.activeCardPool === "removed"}
      >
        Removed
      </button>
    </div>
  )
}

export default DeckSelector