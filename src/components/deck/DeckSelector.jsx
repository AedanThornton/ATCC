const DeckSelector = ({ deckState }) => {
  return (
    <div className="deck-page__card-pool-selector">
      {Object.keys(deckState.cardPools).map((poolName, i) => ( 
        <button key={i}
          className="deck-page__card-pool-selector__action-button"
          onClick={() => deckState.setActiveCardPool(poolName)}
          disabled={deckState.activeCardPool === poolName}
        >
          {poolName.charAt(0).toUpperCase() + poolName.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default DeckSelector