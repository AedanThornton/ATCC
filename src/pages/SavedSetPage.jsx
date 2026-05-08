import React from "react";
import CardRenderer from "../components/cards/CardRenderer";
import { useLocalStorage } from "../context/LocalStorageContext";
import "../styles/savedsetspage.css"

function SavedSetPage() {
  const { appState, cardCache } = useLocalStorage();

  return (
    <div className="saved-sets-page">
      {Object.keys(appState.savedSets).map((setName, i) => (
        <div key={i} className="saved-set-row">
          <span className="saved-set-title">{setName}</span>
          <div className="saved-set-cards">
            {appState.savedSets[setName]?.map((card, j) => (
              <div key={j} className="saved-sets-card-details">
                {/* {cardCache.get(card) && <CardRenderer cardData={cardCache.get(card)} variant="backpack" />} */}
                <span>{cardCache.get(card)?.cardIDs[0]}</span>
                <span>{cardCache.get(card)?.name}</span>
                <span>{cardCache.get(card)?.cardType}</span>
                <span></span>
                <span></span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedSetPage;