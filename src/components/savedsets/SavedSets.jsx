import { useLocalStorage } from "../../context/LocalStorageContext";
import "./savedsets.css"
import { useModal } from "../../context/FocusContext";
import getIcon from "../utils/iconUtils";
import EditableTitle from "../utils/EditableTitle";
import { useState } from "react";
import SavedSetsMenu from "./SavedSetsMenu";
import { useBackpackContext } from "../../context/BackpackContext";
import { useDraggable } from "@dnd-kit/react";
import savedSetsLib from "./savedSetsLib";
import SavedSetsDnDWrapper from "./SavedSetsDnDWrapper";
import SearchableList from "../utils/SearchableList";

function SavedSetCard({setname, card, index}) {
  const { openModal } = useModal();
  const { cardCache, removeCardFromSet } = useLocalStorage();
  const cardData = cardCache.get(card)
  const { ref } = useDraggable({ id: setname + "-" + card })

  const setDisplayHelper = (cardID) => {
    openModal("focusCard", { id: cardID })
  }

  return <li key={index} ref={ref}>
    <div className="saved-sets-card-details clickable" onClick={() => setDisplayHelper(cardCache.get(card)?.cardIDs[0])}>
      <span>{cardData?.name}</span>
      <span
        className="saved-sets-button"
        style={{ flex: "unset" }}
        onClick={(e) => { e.stopPropagation(); removeCardFromSet(setname, card) }}
      >
        {getIcon({ name: "Trash", invert: true })}
      </span>
    </div>
  </li>
}

function SavedSet({ setname, set, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const { appState, cardCache, deleteSet, addCardToSet } = useLocalStorage();
  const { backpackIsActive } = useBackpackContext();
  const { handleSaveSet, handleClickOnSet, renameSet } = savedSetsLib();
  const isBackpackSet = setname === "Backpack";

  const allCards = [...cardCache.entries()]
    .map(([, card]) => {return {id: card.cardIDs[0], name: card.name}})

  function handleAddCardToSet(set, cardID) {
    addCardToSet(set, cardID);
    setAddingCard(false);
  }

  return (
    <div key={index} className="saved-set"
      style={{ border: ((isBackpackSet && backpackIsActive) || (!isBackpackSet && appState.activeSet === set)) ? "3px solid var(--accent)" : "3px solid #00000000" }}
      onClick={() => handleClickOnSet(setname)}
    >

      <div className="saved-set__title-bar">
        <div className="saved-sets-button" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}>{isOpen ? "▽" : "△"}</div>
        {setname === "Backpack"
          ? <span>{getIcon({ name: "Backpack", invert: true })} Backpack</span>
          : setname === "Cards from Search"
            ? <span>{setname}</span>
            : <EditableTitle titleID={index} onSave={renameSet} initialName={setname} />
        }
        {(isBackpackSet || setname === "Cards from Search")
          ? <span className="saved-sets-button" onClick={(e) => { e.stopPropagation(); handleSaveSet(`New Set`, set) }}>
            {getIcon({ name: "Save", invert: true })}
          </span>
          : <SavedSetsMenu options={[
            { title: "Delete", func: () => deleteSet(setname) }
          ]} />
        }

        {/* <span style={{ fontSize: "14px" }}>Cards in set: {appState.savedSets[set].length}</span> */}
      </div>

      <ul className="saved-set__dropdown" style={{display: isOpen ? "block" : "none"}} onClick={(e) => e.stopPropagation()}>
        {addingCard
          ? <SearchableList items={allCards} onItemClick={(id) => handleAddCardToSet(setname, id)} customPlaceholder="Add card..." />
          : <span className="saved-sets__new-set-button" onClick={()=>setAddingCard(true)}>+ Add Card</span>
        }

        {set?.map((card, j) => 
          <SavedSetCard setname={setname} card={card} index={j} />
        )}
      </ul>

    </div>
  )
}

function SavedSets() {
  const [savedSetsOpen, setSavedSetsOpen] = useState(false)
  const { buttonError } = savedSetsLib();

  const { appState, saveSet } = useLocalStorage();

  return (
    <div className='backpack__setslist-sidebar__container' style={{ transform: `translateX(${savedSetsOpen ? "0" : "-100%"})`, width: savedSetsOpen ? "initial" : "0", flex: savedSetsOpen ? "1" : "0"}}>
      <div className='backpack__setslist-sidebar' style={{display: savedSetsOpen ? "initial" : "none"}}>
        <SavedSetsDnDWrapper>
          <div className="saved-sets-panel">
            {appState.activeSet && appState.activeSet.length > 0 &&
              <SavedSet setname={"Backpack"} set={appState.backpack} />
            }
            {appState.searchSet && appState.searchSet.length > 0 &&
              <SavedSet setname={"Cards from Search"} set={appState.searchSet} />
            }
            {Object.keys(appState.savedSets).map((set, i) => (
              <SavedSet setname={set} set={appState.savedSets[set]} index={i} />
            ))}
            {Object.keys(appState.savedSets).length === 0 &&
              <div className="no-saved-sets">
                <p>No saved sets yet!</p>
              </div>
            }

            <div className="saved-sets__new-set-button" onClick={() => saveSet("New Set", [])}>
              + New Empty Set
            </div>

            <div className="saved-sets__new-set-button" onClick={() => saveSet("New Set", appState.activeSet)}>
              {getIcon({name: "Save", invert: true})} Save Current As New Set
            </div>

            {buttonError && <div className="backpack-error-overlay">
              <span>{buttonError}</span>
            </div>}
          </div>
        </SavedSetsDnDWrapper>
      </div>

      <div className='backpack__setslist-sidebar__thumb' onClick={() => setSavedSetsOpen(!savedSetsOpen)}>
        {getIcon({name: "Options", invert: true, size: "1.4em"})}
      </div>
    </div>
  );
}

export default SavedSets;