import { useLocalStorage } from "../../context/LocalStorageContext"
import "../../styles/deckpage.css"
import CardRenderer from "../cards/CardRenderer";
import getIcon from "../utils/iconUtils";

const DeckHighlightCard = ({ highlightCard, setHighlightCard, setCardPools }) => {
  const { cardCache } = useLocalStorage();

  const sendCardToDiscard = (card) => {
    setHighlightCard(null)
    setCardPools(prev => ({
      ...prev,
      discard: [...prev.discard, card],
      deck: prev.deck.filter(c => c !== card)
    }))
  }

  const sendCardToRemoved = (card) => {
    setHighlightCard(null)
    setCardPools(prev => ({
      ...prev,
      removed: [...prev.removed, card],
      deck: prev.deck.filter(c => c !== card)
    }))
  }

  return <div className="deck-page_highlight-card">
    <CardRenderer cardData={cardCache.get(highlightCard)} />
    <div className="deck-page_highlight-card__menu">
      {/* Leave card available button */}
      <button className="deck-page_highlight-card__button"
        onClick={() => setHighlightCard(null)}
      >
        {getIcon({ name: "Check", invert: true })}
      </button>
      {/* Discard card button */}
      <button className="deck-page_highlight-card__button"
        onClick={() => sendCardToDiscard(highlightCard)}
      >
        {getIcon({ name: "Discard", invert: true })}
      </button>
      {/* Remove card from deck button */}
      <button className="deck-page_highlight-card__button"
        onClick={() => sendCardToRemoved(highlightCard)}
      >
        {getIcon({ name: "EndStack", invert: true })}
      </button>

    </div>
  </div>
}

export default DeckHighlightCard