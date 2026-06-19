import { useLocalStorage } from "../../context/LocalStorageContext"
import "./deck.css"
import CardRenderer from "../cards/CardRenderer";
import getIcon from "../utils/iconUtils";

const DeckHighlightCard = ({ deckState }) => {
  const { cardCache } = useLocalStorage();

  const sendCardToDiscard = (card) => {
    deckState.setHighlightCard(null)
    deckState.setCardPools(prev => ({
      ...prev,
      discard: [...prev.discard, card],
      deck: prev.deck.filter(c => c !== card)
    }))
  }

  const sendCardToRemoved = (card) => {
    deckState.setHighlightCard(null)
    deckState.setCardPools(prev => ({
      ...prev,
      removed: [...prev.removed, card],
      deck: prev.deck.filter(c => c !== card)
    }))
  }

  return <div className="deck-page__highlight-card">
    <CardRenderer cardData={cardCache.get(deckState.highlightCard)} variant="backpack" />
    <div className="deck-page__highlight-card__menu">
      {/* Leave card available button */}
      <button className="deck-page__highlight-card__button"
        onClick={() => deckState.setHighlightCard(null)}
      >
        {getIcon({ name: "Check", invert: true })}
      </button>
      {/* Discard card button */}
      <button className="deck-page__highlight-card__button"
        onClick={() => sendCardToDiscard(deckState.highlightCard)}
      >
        {getIcon({ name: "Discard", invert: true })}
      </button>
      {/* Remove card from deck button */}
      <button className="deck-page__highlight-card__button"
        onClick={() => sendCardToRemoved(deckState.highlightCard)}
      >
        {getIcon({ name: "EndStack", invert: true })}
      </button>

    </div>
  </div>
}

export default DeckHighlightCard