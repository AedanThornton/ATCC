import RectractableMenu from "../RetractableMenu"
import "./deck.css"

const DeckActionSidebar = ({ deckState }) => {

  const buttons = [
    {
      iconName: "Reveal", 
      isDisabled: deckState.cardPools[deckState.activeCardPool]?.length < 1, 
      clickFunc: () => deckState.toggleHiddenCards()
    },
  ]

  if (deckState.activeCardPool === "deck") {
    buttons.push(
      {
        iconName: "Shuffle", 
        isDisabled: deckState.cardPools[deckState.activeCardPool]?.length < 1, 
        clickFunc: () => deckState.shuffleCards()
      },
      {
        iconName: "ContinueStack", 
        isDisabled: deckState.cardPools[deckState.activeCardPool]?.length < 1, 
        clickFunc: () => deckState.drawCard()
      }
    )
  }

  if (deckState.activeCardPool === "discard" || deckState.activeCardPool === "removed") {
    buttons.push({
      iconName: "ReturnAllToDeck", 
      isDisabled: deckState.cardPools[deckState.activeCardPool]?.length < 1, 
      clickFunc: () => deckState.returnAllCardsToDeck()
    })
  }

  if (deckState.activeCardPool !== "deck" && deckState.activeCardPool !== "discard" && deckState.activeCardPool !== "removed") {
    buttons.push({
      iconName: "ReturnRandomToDeck", 
      isDisabled: deckState.cardPools[deckState.activeCardPool]?.length < 1, 
      clickFunc: () => {
        let i = deckState.cardPools.deck.length - 1
        const chosenCard = Math.floor(Math.random() * (i + 1));
        deckState.moveCard(deckState.cardPools[deckState.activeCardPool][chosenCard], deckState.activeCardPool, "deck");
      }
    })
  }

  return (
    <RectractableMenu 
      preformattedButtons={buttons} 
      customButtons={[(
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
      )]} 
    />
  )
}

export default DeckActionSidebar