import { useLocalStorage } from "../../../context/LocalStorageContext";
import "../savedsets.css"
import { useModal } from "../../../context/FocusContext";
import getIcon from "../../utils/iconUtils";
import EditableTitle from "../../utils/EditableTitle";
import { useRef, useState } from "react";
import SavedSetsMenu from "../SavedSetsMenu";
import { useBackpackContext } from "../../../context/BackpackContext";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { Feedback } from "@dnd-kit/dom";
import savedSetsLib from "../savedSetsLib";
import SearchableList from "../../utils/SearchableList";
import Tippy from "@tippyjs/react";
import CardRenderer from "../../cards/CardRenderer";
import { useMatch } from "react-router-dom";

export function SavedSetCard({setname, cardID, index, isBackpackSet, isSearchSet, removeFunc}) {
  const [longHover, setLongHover] = useState(false);
  const hoverTimer = useRef();

  const { openModal } = useModal();
  const { cardCache, removeFromBackpack } = useLocalStorage();
  const cardData = cardCache.get(cardID)
  const { ref, isDragging } = useDraggable({ id: setname + "-" + cardID, plugins: [Feedback.configure({ feedback: 'clone' })] })

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
        {!isSearchSet && <span
          className="saved-sets-button"
          style={{ flex: "unset" }}
          onClick={(e) => { e.stopPropagation(); isBackpackSet ? removeFromBackpack(cardID) : removeFunc(setname, cardID) }}
        >
          ✖
        </span>}
      </div>
    </Tippy>
  </li>
}

export function SavedSet({ setname, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const { appState, cardCache, addCardToSet, addToBackpack, removeCardFromSet } = useLocalStorage();
  const { handleSaveSet, handleClickOnSet, renameSet, handleDeleteSet } = savedSetsLib();
  const isBackpackSet = setname === "Backpack";
  const isSearchSet = setname === "Current Search";
  const {ref, isDropTarget} = useDroppable({ id: setname, data: {onDrop: handleSetDrop} });

  const set = isBackpackSet ? appState.backpack
    : isSearchSet ? appState.searchSet
    : appState.savedSets[setname]

  function handleSetDrop(id){
    if (!id) return
    const idParts = id.split("-")
    const realID = idParts[idParts.length - 1]
    isBackpackSet && addToBackpack(realID)
    !isBackpackSet && !isSearchSet && addCardToSet(setname, realID)   
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
      onClick={() => handleClickOnSet(setname, isBackpackSet, isSearchSet)}
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
        {(!isBackpackSet && !isSearchSet) && (addingCard
          ? <SearchableList items={allCards} onItemClick={(id) => handleAddCardToSet(setname, id)} customPlaceholder="Add card..." />
          : <span className="saved-sets__new-set-button" onClick={()=>setAddingCard(true)}>+ Add Card</span>
        )}

        {set?.map((card, j) => 
          <div className="saved-sets-card__empty-slot">
            <SavedSetCard setname={setname} cardID={card} index={j} isBackpackSet={isBackpackSet} isSearchSet={isSearchSet} removeFunc={removeCardFromSet} />
          </div>
        )}
      </ul>

    </div>
  )
}