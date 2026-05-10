import { useLocalStorage } from "../../context/LocalStorageContext"
import getIcon from "../utils/iconUtils";
import "../../styles/deckpage.css"
import CardRenderer from "../cards/CardRenderer";

const DeckRenderer = ({ cardPools, activeCardPool, hiddenCards, setHiddenCards }) => {
  const { cardCache } = useLocalStorage();

  const toggleSingleHiddenCard = (cardToChange) => {
    setHiddenCards(() => {
      const newSet = {};
      cardPools.deck.map(card => newSet[card] = card === cardToChange ? !hiddenCards[card] : hiddenCards[card])
      return newSet;
    })
  }

  return <div className="deck-page_card-list">
    {cardPools[activeCardPool]?.map((card, i) =>
      <div key={i}>
        {!hiddenCards[card]
          ? cardCache.get(card) && <CardRenderer cardData={cardCache.get(card)} />
          : <div className="deck-page_hidden-card mini-american">
            Hidden Card
            <button className="deck-page_action-button"
              onClick={() => toggleSingleHiddenCard(card)}
            >
              {getIcon({ name: "Reveal", invert: true })}
            </button>
          </div>
        }
      </div>
    )}
    {cardPools[activeCardPool]?.length < 1 && <span>No cards in {activeCardPool} pool.</span>}
  </div>
}

export default DeckRenderer