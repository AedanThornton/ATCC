import { useLocalStorage } from "../../context/LocalStorageContext"
import getIcon from "../utils/iconUtils";
import "../../styles/deckpage.css"
import CardRenderer from "../cards/CardRenderer";
import DeckCardMenu from "./DeckCardMenu";
import { useDecks } from "../../hooks/useDecks";

const DeckRenderer = ({ deckState }) => {
  const { cardCache } = useLocalStorage();
  
  return <div className="deck-page_card-list">
    {deckState.cardPools[deckState.activeCardPool]?.map((cardID, i) => {

      return <div key={i}>
        {!deckState.hiddenCards[cardID]
          ? cardCache.get(cardID) && <CardRenderer cardData={cardCache.get(cardID)} menu={<DeckCardMenu deckState={deckState} card={cardID} />} />
          : 
          <div className="deck-page_hidden-card mini-american">
            Hidden Card
            <button className="deck-page_action-button"
              onClick={() => deckState.toggleSingleHiddenCard(cardID)}
            >
              {getIcon({ name: "Reveal", invert: true })}
            </button>
          </div>
        }
      </div>
    })}
    
    {deckState.cardPools[deckState.activeCardPool]?.length < 1 && <span>No cards in {deckState.activeCardPool} pool.</span>}
  </div>
}

export default DeckRenderer