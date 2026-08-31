import getIcon from "../utils/iconUtils"

const DeckCardMenu = ({ deckState, card }) => {
  return (
    <div className="card-menu">
      {deckState.activeCardPool !== "deck" &&
        <button onClick={() => deckState.moveCard(card, deckState.activeCardPool, "deck")}>{getIcon({name: "ReturnToDeck", size: "1.5em", invert: true})}</button>}
      {deckState.activeCardPool !== "discard" &&
        <button onClick={() => deckState.moveCard(card, deckState.activeCardPool, "discard")}>{getIcon({name: "Discard", size: "1.5em", invert: true})}</button>}
      {deckState.activeCardPool !== "removed" &&
        <button onClick={() => deckState.moveCard(card, deckState.activeCardPool, "removed")}>{getIcon({name: "Trash", size: "1.5em", invert: true})}</button>}
    </div>
  )
}

export default DeckCardMenu;