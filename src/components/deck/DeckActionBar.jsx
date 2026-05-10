import { useState } from "react";
import getIcon from "../utils/iconUtils"
import "../../styles/deckpage.css"
import { useLocalStorage } from "../../context/LocalStorageContext";

const DeckActionBar = ({ hiddenCards, setHiddenCards, cardPools, setCardPools, setHighlightCard, cardSetName }) => {
  const [showSetList, setShowSetList] = useState(false);
  const [activeSetName, setActiveSetName] = useState(cardSetName);
  const { appState } = useLocalStorage()

  const handleSetItemSelect = (setSelected) => {
    setShowSetList(false)
    setActiveSetName(setSelected)
    setCardPools(prev => ({
      ...prev,
      deck: appState.savedSets[setSelected],
      discard: [],
      removed: []
    }))
    setHideAllCards(false)
  }

  const setHideAllCards = (hide) => {
    setHiddenCards(() => {
      const newSet = {};
      cardPools.deck.map(card => newSet[card] = hide)
      return newSet;
    })
  }

  const toggleHiddenCards = () => {
    const anyHidden = cardPools.deck.some(card => hiddenCards[card] === true)
    anyHidden
      ? setHideAllCards(false)
      : setHiddenCards(() => {
        const newSet = {};
        cardPools.deck.map(card => newSet[card] = !hiddenCards[card])
        return newSet;
      })
  }

  const handleShuffleCards = () => {
    const cardSetCopy = [...cardPools.deck]
    //Fisher-Yates Shuffle
    for (let i = cardSetCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardSetCopy[i], cardSetCopy[j]] = [cardSetCopy[j], cardSetCopy[i]];
    }

    setCardPools(prev => ({
      ...prev,
      deck: cardSetCopy
    }))
  }

  const handleDrawCard = () => {
    let i = cardPools.deck.length - 1
    const chosenCard = Math.floor(Math.random() * (i + 1));

    setHighlightCard(cardPools.deck[chosenCard])
  }

  return <div className="deck-page_action-bar">

    <div className="deck-page_button-wrapper">
      {/* Hide/Reveal cards toggle */}
      <button className="deck-page_action-button"
        onClick={() => toggleHiddenCards()}
        disabled={!activeSetName}
      >
        {getIcon({ name: "Reveal", invert: true })}
      </button>
      {/* Shuffle cards button */}
      <button className="deck-page_action-button"
        onClick={() => handleShuffleCards()}
        disabled={!activeSetName}
      >
        {getIcon({ name: "Shuffle", invert: true })}
      </button>
    </div>

    <div className="deck-page_set-title" onMouseEnter={() => setShowSetList(true)} onMouseLeave={() => setShowSetList(false)}>
      {activeSetName}

      {showSetList && <div className="deck-page_set-list">
        {Object.keys(appState.savedSets)?.map((setName, i) => (
          <div
            key={i}
            className="deck-page_set-list-item"
            onClick={() => handleSetItemSelect(setName)}
          >
            {setName}
          </div>
        ))}
      </div>}
    </div>

    <div className="deck-page_button-wrapper">
      {/* Draw a card button */}
      <button className="deck-page_action-button"
        onClick={() => handleDrawCard()}
        disabled={!activeSetName}
      >
        {getIcon({ name: "ContinueStack", invert: true })}
      </button>
    </div>

  </div>
}

export default DeckActionBar