const DeckSelector = ({ deckState }) => {
  return (
    <div className="deck-page_card-pool-selector">
      {Object.keys(deckState.cardPools).map(poolName => ( 
        <button className="deck-page_card-pool-selector_action-button"
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