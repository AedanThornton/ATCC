import getIcon from "../utils/iconUtils"

const getPoolIcon = (poolName) => {
  switch (poolName) {
    case "deck":
      return <span>{getIcon({name: "Deck", invert: true})} </span>
      break
    case "discard":
      return <span>{getIcon({name: "Discard", invert: true})} </span>
      break
    case "removed":
      return <span>{getIcon({name: "Trash", invert: true})} </span>
      break
    default:
      return ""
      break
  }
}

const DeckSelector = ({ deckState }) => {
  return (
    <div className="deck-page__card-pool-selector">
      {Object.keys(deckState.cardPools).map((poolName, i) => ( 
        <button key={i}
          className="deck-page__card-pool-selector__action-button"
          onClick={() => deckState.setActiveCardPool(poolName)}
          disabled={deckState.activeCardPool === poolName}
        >
          {getPoolIcon(poolName)}{poolName.charAt(0).toUpperCase() + poolName.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default DeckSelector