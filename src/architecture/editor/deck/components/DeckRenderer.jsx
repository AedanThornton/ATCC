import { useLocalStorage } from "../../../../management/localstorage/LocalStorageContext";
import getIcon from "../../../../components/utils/iconUtils";
import "../deck.css"
import CardRenderer from "../../../../components/cards/CardRenderer";
import { useDroppable } from "@dnd-kit/react";

const DeckRenderer = ({ deckState }) => {
  const { cardCache } = useLocalStorage();
  const { ref, isDropTarget } = useDroppable({ id: "deck", data: {onDrop: handleDeckDrop} });

  function handleDeckDrop(id) {
    if (!id) return
    const idParts = id.split("-")
    const realID = idParts[idParts.length - 1]
    if (deckState.cardPools[deckState.activeCardPool].includes(realID)) return
    deckState.addCardToActivePool(realID)
  }
  
  return (
    <div className={`deck-page__card-list__wrapper ${isDropTarget ? "is-drop-target" : ""}`} ref={ref}>
      <div className="deck-page__card-list">
        {deckState.cardPools[deckState.activeCardPool]?.map((cardID, i) => {

          return <div key={i}>
            {!deckState.hiddenCards[cardID]
              ? cardCache.get(cardID) && <CardRenderer cardData={cardCache.get(cardID)} />
              : 
              <div className="deck-page__hidden-card mini-american">
                Hidden Card
                <button className="deck-page__action-button"
                  onClick={() => deckState.toggleSingleHiddenCard(cardID)}
                >
                  {getIcon({ name: "Reveal", invert: true })}
                </button>
              </div>
            }
          </div>
        })}
        
        {deckState.cardPools[deckState.activeCardPool]?.length < 1 &&
          <p style={{textAlign: "center"}}>
            <span>No cards in {deckState.activeCardPool} pool.</span>
            {!(Object.keys(deckState.cardPools).some(pool => deckState.cardPools[pool].length > 0)) && 
              (deckState.deckSource === "custom"
                ? <><br /><span>Select a card set to play with in the right panel.</span></>
                : <><br /><span>Use the dropdowns above to select a deck.</span></>)
            }
          </p>
        }
      </div>
    </div>
  )
}

export default DeckRenderer