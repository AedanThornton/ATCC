import { useLocalStorage } from "../../context/LocalStorageContext";
import "./savedsets.css"
import { useModal } from "../../context/FocusContext";
import getIcon from "../utils/iconUtils";
import EditableTitle from "../utils/EditableTitle";
import { useEffect, useRef, useState } from "react";
import SavedSetsMenu from "./SavedSetsMenu";
import { useBackpackContext } from "../../context/BackpackContext";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { Feedback } from "@dnd-kit/dom";
import savedSetsLib from "./savedSetsLib";
import SearchableList from "../utils/SearchableList";
import SavedSetsSelector from "./SavedSetsSelector";
import { useSavedSetsContext } from "../../context/SavedSetsContext";
import Tippy from "@tippyjs/react";
import CardRenderer from "../cards/CardRenderer";
import { useMatch } from "react-router-dom";

function SavedSetCard({setname, card, index}) {
  const [longHover, setLongHover] = useState(false);
  const hoverTimer = useRef();

  const { openModal } = useModal();
  const { cardCache, removeCardFromSet } = useLocalStorage();
  const cardData = cardCache.get(card)
  const { ref, isDragging } = useDraggable({ id: setname + "-" + card, plugins: [Feedback.configure({ feedback: 'clone' })] })

  const { activeView } = useBackpackContext();
  const isComparePage = useMatch("/backpack") && activeView === "Compare"
  const enabled = (!isComparePage || cardData.cardType === "Gear")

  const setDisplayHelper = (cardID) => {
    openModal("focusCard", { id: cardID })
  }

  const onHover = () => {
    hoverTimer.current = setTimeout(() => {
      setLongHover(true)
    }, 500);
  }

  const onUnhover = () => {
    clearTimeout(hoverTimer.current)
    setLongHover(false)
  }

  return <li key={index} ref={enabled ? ref : null}>
    <Tippy
      duration={0} 
      appendTo={document.body}
      offset={[0, 0]}
      placement="right-start"
      content={longHover && <div className="saved-sets-card__hover-display"><CardRenderer cardData={cardData} /></div>}
    >

      <div 
        className="saved-sets-card-details clickable"
        onClick={() => setDisplayHelper(cardData?.cardIDs[0])}
        onPointerEnter={() => onHover()}
        onPointerLeave={() => onUnhover()}
        style={{opacity: isDragging ? "0.3" : "unset", textDecoration: !enabled ? "line-through solid black 2px" : "unset"}}
      >
        <span>{!enabled && getIcon({name: "X"})}{!enabled && " "}{cardData?.name}</span>
        <span
          className="saved-sets-button"
          style={{ flex: "unset" }}
          onClick={(e) => { e.stopPropagation(); removeCardFromSet(setname, card) }}
        >
          {getIcon({ name: "Trash", invert: true })}
        </span>
      </div>
    </Tippy>
  </li>
}

function SavedSet({ setname, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const { appState, cardCache, addCardToSet } = useLocalStorage();
  const { handleSaveSet, handleClickOnSet, renameSet, handleDeleteSet } = savedSetsLib();
  const isBackpackSet = setname === "Backpack";
  const isSearchSet = setname === "Current Search";
  const {ref, isDropTarget} = useDroppable({ id: setname, data: {onDrop: handleSetDrop} });

  const set = appState.savedSets[setname]

  function handleSetDrop(id){
    if (!id) return
    const idParts = id.split("-")
    const realID = idParts[idParts.length - 1]
    addCardToSet(setname, realID)    
  }

  const allCards = [...cardCache.entries()]
    .map(([, card]) => {return {id: card.cardIDs[0], name: card.name}})

  function handleAddCardToSet(set, cardID) {
    addCardToSet(set, cardID);
    setAddingCard(false);
  }

  return (
    <div key={index} className="saved-set"
      ref={ref}
      style={{ 
        outline: isDropTarget ? "3px solid var(--accent-light)" : "initial",
        outlineOffset: "-3px"
      }}
      onClick={() => handleClickOnSet(setname)}
    >

      <div className="saved-set__title-bar">
        <div className="saved-sets-button" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}>{isOpen ? "▽" : "△"}</div>
        
        {isBackpackSet && <span>{getIcon({ name: "Backpack", invert: true })} {setname}</span>}
        {isSearchSet && <span>{getIcon({ name: "Catalog", invert: true })} {setname}</span>}
        {(!isBackpackSet && !isSearchSet) && <EditableTitle titleID={index} onSave={renameSet} initialName={setname} />}
        
        {(isBackpackSet || isSearchSet)
          ? <span className="saved-sets-button" onClick={(e) => { e.stopPropagation(); handleSaveSet(`New Set`, set) }}>
            {getIcon({ name: "Save", invert: true })}
          </span>
          : <SavedSetsMenu options={[
            { title: <>Merge {getIcon({name: "Backpack", invert: true})}</>, func: () => appState.backpack.map(card => addCardToSet(setname, card)) },
            { title: "Duplicate", func: () => handleSaveSet(setname, set) },
            { title: "Delete", func: () => handleDeleteSet(setname) }
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
          <div className="saved-sets-card__empty-slot">
            <SavedSetCard setname={setname} card={card} index={j} />
          </div>
        )}
      </ul>

    </div>
  )
}

function SavedSets() {
  const [savedSetsOpen, setSavedSetsOpen] = useState(false);
  const { currentSetType, activeSetName } = useSavedSetsContext();
  const { buttonError, checkForSetNameMatch } = savedSetsLib();
  const { appState, saveSet } = useLocalStorage();

  const {ref} = useDroppable({id: "saved-sets-panel"})
  const isCatalogPage = useMatch("/catalog")

  useEffect(() => {
    checkForSetNameMatch()
  }, [appState.activeSet])

  return (
    <div className='backpack__setslist-sidebar__container' 
      style={{ 
        transform: `translateX(${savedSetsOpen ? "0" : "-100%"})`,
        width: savedSetsOpen ? "initial" : "0",
        flex: savedSetsOpen ? "1" : "0",
      }}
    >
      <div className='backpack__setslist-sidebar' style={{display: savedSetsOpen ? "initial" : "none"}}>
        <div className="saved-sets-panel" ref={ref}>

          {!isCatalogPage && appState.activeSet.length < 1 && <h1>Select a set...</h1>}
          {!isCatalogPage && appState.activeSet.length > 0 && 
            (activeSetName === null
            ? <h1 
                className="setbutton"
                onClick={() => saveSet("New Set", appState.activeSet)}
              >
                +{getIcon({name: "Save", invert: true})} Save Current
              </h1>
            : <h1>
                {activeSetName === "Backpack" && <>{getIcon({name: "Backpack", invert: true})} </>}
                {activeSetName === "Current Search" && <>{getIcon({name: "Catalog", invert: true})} </>}
                {activeSetName}
              </h1>
            )
          }

          <SavedSet setname={"Backpack"} set={appState.backpack} />
          {appState.searchSet &&
            <SavedSet setname={"Current Search"} set={appState.searchSet} />
          }

          <h2>SAVED</h2>

          <SavedSetsSelector />

          <div className="saved-sets__set-list">
            {currentSetType === "Sets" && Object.keys(appState.savedSets).map((set, i) => (
              <SavedSet setname={set} index={i} />
            ))}
            {currentSetType === "Decks" && Object.keys(appState.savedSets).map((set, i) => (
              // <SavedSet setname={set} set={appState.savedSets[set]} index={i} />
              <></>
            ))}
            {/* {currentSetType === "Loadouts" && Object.keys(appState.savedSets).map((set, i) => (
              // <SavedSet setname={set} set={appState.savedSets[set]} index={i} />
              <></>
            ))} */}
          </div>

          {!appState["saved" + currentSetType] || Object.keys(appState["saved" + currentSetType]).length === 0 &&
            <div className="no-saved-sets">
              <p>No saved {currentSetType} yet!</p>
            </div>
          }

          <div className="saved-sets__new-set-button" onClick={() => saveSet("New Set", [])}>
            + New Empty Set
          </div>

          {buttonError && <div className="backpack-error-overlay">
            <span>{buttonError}</span>
          </div>}
        </div>
      </div>

      <div className='backpack__setslist-sidebar__thumb' onClick={() => setSavedSetsOpen(!savedSetsOpen)}>
        {getIcon({name: "Options", invert: true, size: "1.4em"})}
      </div>
    </div>
  );
}

export default SavedSets;