import { useState } from "react";
import getIcon from "../utils/iconUtils"
import "../../styles/deckpage.css"
import { useLocalStorage } from "../../context/LocalStorageContext";
import { Link } from "react-router-dom";

const DeckActionBar = ({ hiddenCards, setHiddenCards, cardPools, setCardPools, setHighlightCard, cardSetName, activeCardPool }) => {
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

  const handleReturnAllToDeck = () => {
    setCardPools(prev => ({
      ...prev,
      [activeCardPool]: [],
      deck: [...prev.deck, ...prev[activeCardPool]]
    }))
  }

  return <div className="deck-page_action-bar">

    <div className="deck-page_button-wrapper">
      {/* Hide/Reveal cards toggle */}
      {activeCardPool === "deck" && <button className="deck-page_action-button"
        onClick={() => toggleHiddenCards()}
        disabled={!activeSetName}
      >
        {getIcon({ name: "Reveal", size: "1.5em" })}
      </button>}
      <Link to="/savedsets" className="deck-page_action-button">{getIcon({ name: "List", invert: true })}</Link>
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
      {/* Shuffle cards button */}
      {activeCardPool === "deck" && <button className="deck-page_action-button"
        onClick={() => handleShuffleCards()}
        disabled={!activeSetName}
      >
        {getIcon({ name: "Shuffle", invert: true })}
      </button>}
      {/* Draw a card button */}
      <button className="deck-page_action-button"
        onClick={() => activeCardPool === "deck"
          ? handleDrawCard()
          : handleReturnAllToDeck()
        }
        disabled={!activeSetName}
      >
        {activeCardPool === "deck"
          ? getIcon({ name: "ContinueStack", invert: true, size: "1.5em" })
          : getIcon({ name: "ReturnAllToDeck", invert: true, size: "1.5em" })
        }
      </button>
    </div>

  </div>
}

export default DeckActionBar