import getIcon from "../utils/iconUtils"

const DeckCardMenu = ({ card, setCardPools, activeCardPool }) => {
  const sendCardToDeck = (card) => {
    setCardPools(prev => ({
      ...prev,
      deck: [...prev.deck, card],
      discard: prev.discard.filter(c => c !== card)
    }))
  }

  const sendCardToDiscard = (card) => {
    setCardPools(prev => ({
      ...prev,
      discard: [...prev.discard, card],
      deck: prev.deck.filter(c => c !== card)
    }))
  }

  const sendCardToRemoved = (card) => {
    setCardPools(prev => ({
      ...prev,
      removed: [...prev.removed, card],
      deck: prev.deck.filter(c => c !== card)
    }))
  }

  return (
    <div className="card-menu">
      {activeCardPool !== "deck" && <button onClick={() => sendCardToDeck(card)}>{getIcon({name: "ReturnToDeck", size: "1.5em", invert: true})}</button>}
      {activeCardPool !== "discard" && <button onClick={() => sendCardToDiscard(card)}>{getIcon({name: "Discard", size: "1.5em", invert: true})}</button>}
      {activeCardPool !== "removed" && <button onClick={() => sendCardToRemoved(card)}>{getIcon({name: "EndStack", size: "1.5em", invert: true})}</button>}
    </div>
  )
}

export default DeckCardMenu;