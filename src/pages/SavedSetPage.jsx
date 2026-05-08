import React from "react";
import CardRenderer from "../components/cards/CardRenderer";
import { useLocalStorage } from "../context/LocalStorageContext";
import "../styles/savedsetspage.css"
import { useModal } from "../context/FocusContext";

function SavedSetPage() {
  const { appState, cardCache } = useLocalStorage();
  const { openModal } = useModal();
  
  const setDisplayHelper = (cardID) => {
    openModal("focusCard", { id: cardID })
  }

  return (
    <div className="saved-sets-page">
      {Object.keys(appState.savedSets).map((setName, i) => (
        <div key={i} className="saved-set-row">
          <span className="saved-set-title">{setName}</span>
          <div className="saved-set-cards">
            <div className="saved-sets-card-details" style={{ borderBottom: "1px solid white", fontSize: "18px", fontWeight: "bold" }}>
              <span>IDs</span>
              <span>Name</span>
              <span>Type</span>
            </div>
            <div className="saved-sets-card-list">
              {appState.savedSets[setName]?.map((card, j) => (
                <div key={j} className="saved-sets-card-details clickable" onClick={() => setDisplayHelper(cardCache.get(card)?.cardIDs[0])}>
                  <span>{cardCache.get(card)?.cardIDs.join(", ")}</span>
                  <span>{cardCache.get(card)?.name}</span>
                  <span>{cardCache.get(card)?.cardType}</span>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedSetPage;