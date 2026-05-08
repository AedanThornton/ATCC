import React, { useEffect, useState } from "react";
import CardRenderer from "../components/cards/CardRenderer";
import { useLocalStorage } from "../context/LocalStorageContext";
import "../styles/savedsetspage.css"
import { useModal } from "../context/FocusContext";
import getIcon from "../components/utils/iconUtils";

function SavedSetPage() {
  const { appState, cardCache, saveSet, deleteSet } = useLocalStorage();
  const { openModal } = useModal();
  const [draftingName, setDraftingName] = useState("")
  const [editingID, setEditingID] = useState(null);
  
  const setDisplayHelper = (cardID) => {
    openModal("focusCard", { id: cardID })
  }

  const removeCardFromSet = (setName, cardID) => {
    saveSet(setName, appState.savedSets[setName].filter(c => c !== cardID))
  }

  const renameSet = (setName, newName) => {
    if (setName === newName) return
    saveSet(newName, appState.savedSets[setName])
    deleteSet(setName)
  }

  const handleSaveName = (oldName) => {
    renameSet(oldName, draftingName)
    setEditingID(null)
  }

  const handleStartEditing = (id, name) => {
    setEditingID(id)
    setDraftingName(name)
  }

  const handleSearchUpdate = (term) => {
    if (term.length > 20) {
      term = term.slice(0, 20);
    }

    setDraftingName(term);
  }

  return (
    <div className="saved-sets-page">
      {Object.keys(appState.savedSets).map((set, i) => (
        <div key={i} className="saved-set-row">
          <div className="saved-set-menu">
            <span className="saved-set-title">
              <span 
                className="saved-sets-button" 
                onClick={() => editingID === i ? handleSaveName(set) : handleStartEditing(i, set)}
              >
                {getIcon({ name: editingID === i ? "Check" : "Edit", invert: true })}
              </span>

              {editingID === i
                ? <input
                  type="text"
                  placeholder="Set name..."
                  value={draftingName}
                  onChange={(e) => handleSearchUpdate(e.target.value)}
                  className="saved-sets-page-search-bar"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveName(set)
                    }
                  }}
                />
                : <span className="saved-sets-title-nonediting">{set}</span>
              }
              <span className="saved-sets-button" onClick={() => deleteSet(set)}>{getIcon({ name: "Trash", invert: true })}</span>
            </span>
            <span style={{ fontSize: "14px" }}>Cards in set: {appState.savedSets[set].length}</span>
          </div>
          <div className="saved-set-cards">

            <div className="saved-sets-card-details title">
              <span>IDs</span>
              <span>Name</span>
              <span>Type</span>
              <span className="saved-sets-button" style={{ flex: "unset" }} ></span>
            </div>

            <div className="saved-sets-card-list">
              {appState.savedSets[set]?.map((card, j) => (
                <div key={j} className="saved-sets-card-details clickable" onClick={() => setDisplayHelper(cardCache.get(card)?.cardIDs[0])}>
                  <span>{cardCache.get(card)?.cardIDs.join(", ")}</span>
                  <span>{cardCache.get(card)?.name}</span>
                  <span>{cardCache.get(card)?.cardType}</span>
                  <span className="saved-sets-button" style={{ flex: "unset" }} onClick={(e) => {e.stopPropagation(); removeCardFromSet(set, card)}}>{getIcon({ name: "Trash", invert: true })}</span>
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