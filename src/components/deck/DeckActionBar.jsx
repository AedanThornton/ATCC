import { useState } from "react";
import getIcon from "../utils/iconUtils"
import "../../styles/deckpage.css"
import { useLocalStorage } from "../../context/LocalStorageContext";
import { Link, useSearchParams } from "react-router-dom";
import PrebuiltDecksBuilder from "./PrebuiltDecksBuilder";

const DeckActionBar = ({ cardSetName, deckState }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showSetList, setShowSetList] = useState(false);
  const [activeSetName, setActiveSetName] = useState(cardSetName);
  const { appState } = useLocalStorage();

  const handleSetItemSelect = (setSelected) => {
    setShowSetList(false)
    setActiveSetName(setSelected)
    deckState.setCardPools(prev => ({
      ...prev,
      deck: appState.savedSets[setSelected],
      discard: [],
      removed: []
    }))
    deckState.setHideAllCards(false)
  }

  return <div className="deck-page_action-bar">
    <div className="deck-page_button-wrapper">
      <Link to="/savedsets" className="deck-page_action-button">{getIcon({ name: "List", invert: true })}</Link>
      {/* Custom/prebuild toggle button */}
      <button className="deck-page_action-button"
        onClick={() => {deckState.setDeckSource(deckState.deckSource === "prebuilt" ? "custom" : "prebuilt"); setSearchParams({}); setActiveSetName("")}}
      >
        {deckState.deckSource === "prebuilt"
          ? getIcon({ name: "ArgoKnowledge", invert: true, size: "1.2em" })
          : getIcon({ name: "Edit", invert: true, size: "1.2em" })
        }
      </button>
    </div>

    {deckState.deckSource === "prebuilt"
      ? <PrebuiltDecksBuilder />
      : <div className="deck-page_set-title" onMouseEnter={() => setShowSetList(true)} onMouseLeave={() => setShowSetList(false)}>
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
    }

    <div className="deck-page_button-wrapper">
      {/* Hide/Reveal cards toggle */}
      {deckState.activeCardPool === "deck" && <button className="deck-page_action-button"
        onClick={() => deckState.toggleHiddenCards()}
        disabled={deckState.cardPools[deckState.activeCardPool]?.length < 1}
      >
        {getIcon({ name: "Reveal", size: "1.5em" })}
      </button>}
      {/* Shuffle cards button */}
      {deckState.activeCardPool === "deck" && <button className="deck-page_action-button"
        onClick={() => deckState.shuffleCards()}
        disabled={deckState.cardPools[deckState.activeCardPool]?.length < 1}
      >
        {getIcon({ name: "Shuffle", invert: true })}
      </button>}
      {/* Draw a card button */}
      <button className="deck-page_action-button"
        onClick={() => deckState.activeCardPool === "deck"
          ? deckState.drawCard()
          : deckState.returnAllCardsToDeck()
        }
        disabled={deckState.cardPools[deckState.activeCardPool]?.length < 1}
      >
        {deckState.activeCardPool === "deck"
          ? getIcon({ name: "ContinueStack", invert: true, size: "1.5em" })
          : getIcon({ name: "ReturnAllToDeck", invert: true, size: "1.5em" })
        }
      </button>
    </div>

  </div>
}

export default DeckActionBar