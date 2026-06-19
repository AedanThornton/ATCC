import getIcon from "../utils/iconUtils"
import "./deck.css"

const DeckActionSidebar = ({ deckState }) => {

  return <div className="deck-page__action-sidebar">
    <div className="deck-page__button-wrapper">
      {/* Custom/prebuild toggle button */}
      <button className="deck-page__action-button deck-page__toggle"
        onClick={() => {deckState.setDeckSource(deckState.deckSource === "prebuilt" ? "custom" : "prebuilt")}}
      >
        {deckState.deckSource === "prebuilt"
          ? <span>Pre-builts</span>
          : <span>Custom</span>
        }
      </button>
    </div>

    {/* Hide/Reveal cards toggle */}
    <button className="deck-page__action-button"
      onClick={() => deckState.toggleHiddenCards()}
      disabled={deckState.cardPools[deckState.activeCardPool]?.length < 1}
    >
      {getIcon({ name: "Reveal", size: "1.5em" })}
    </button>
    {/* Shuffle cards button */}
    {deckState.activeCardPool === "deck" && <button className="deck-page__action-button"
      onClick={() => deckState.shuffleCards()}
      disabled={deckState.cardPools[deckState.activeCardPool]?.length < 1}
    >
      {getIcon({ name: "Shuffle", invert: true })}
    </button>}
    {/* Draw a card button */}
    {deckState.activeCardPool === "deck"
      && <button className="deck-page__action-button"
      onClick={() => deckState.drawCard()}
      disabled={deckState.cardPools[deckState.activeCardPool]?.length < 1}
    >
      {getIcon({ name: "ContinueStack", invert: true, size: "1.5em" })}
    </button>}
    {/* Return all cards to deck button */}
    {(deckState.activeCardPool === "discard" || deckState.activeCardPool === "removed")
      && <button className="deck-page__action-button"
      onClick={() => deckState.returnAllCardsToDeck()
      }
      disabled={deckState.cardPools[deckState.activeCardPool]?.length < 1}
    >
      {getIcon({ name: "ReturnAllToDeck", invert: true, size: "1.5em" })}
    </button>}
    {/* Send random card to deck button */}
    {deckState.activeCardPool !== "deck" && deckState.activeCardPool !== "discard" && deckState.activeCardPool !== "removed"
      && <button className="deck-page__action-button"
      onClick={() => {
        let i = deckState.cardPools.deck.length - 1
        const chosenCard = Math.floor(Math.random() * (i + 1));
        deckState.moveCard(deckState.cardPools[deckState.activeCardPool][chosenCard], deckState.activeCardPool, "deck");
      }}
      disabled={deckState.cardPools[deckState.activeCardPool]?.length < 1}
    >
      {getIcon({name: "ReturnRandomToDeck", size: "1.5em", invert: true})}
    </button>}

  </div>
}

export default DeckActionSidebar