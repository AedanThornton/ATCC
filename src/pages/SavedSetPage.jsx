import { useLocalStorage } from "../context/LocalStorageContext";
import "../styles/savedsetspage.css"
import { useModal } from "../context/FocusContext";
import getIcon from "../components/utils/iconUtils";
import { Link } from "react-router-dom";
import EditableTitle from "../components/utils/EditableTitle";

function SavedSetPage() {
  const { appState, cardCache, saveSet, deleteSet } = useLocalStorage();
  const { openModal } = useModal();
  
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

  return (
    <div className="saved-sets-page">
      {Object.keys(appState.savedSets).map((set, i) => (
        <div key={i} className="saved-set-row">
          <div className="saved-set-menu">
            <EditableTitle titleID={i} onSave={renameSet} initialName={set} />
            <span className="saved-sets-button" onClick={() => deleteSet(set)}>{getIcon({ name: "Trash", invert: true })}</span>
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
      {Object.keys(appState.savedSets).length === 0 && 
        <div className="no-saved-sets">
          <p>No saved sets yet!</p>
          <p>Sets can be saved in the <Link to="/catalog">Card Catalog</Link> on the left popout panel.</p>
        </div>
      }
    </div>
  );
}

export default SavedSetPage;