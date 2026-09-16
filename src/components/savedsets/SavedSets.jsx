import { useLocalStorage } from "../../context/LocalStorageContext";
import "./savedsets.css"
import getIcon from "../utils/iconUtils";
import { useEffect } from "react";
import { useDroppable } from "@dnd-kit/react";
import savedSetsLib from "./savedSetsLib";
import SavedSetsSelector from "./SavedSetsSelector";
import { useSavedSetsContext } from "../../context/SavedSetsContext";
import { useMatch } from "react-router-dom";
import SavedLoadout from "./savetypes/SavedLoadout";
import { SavedSet } from "./savetypes/SavedSet";

function SavedSets() {
  const isNotMobile = window.matchMedia('(hover: hover)').matches;

  const { currentSetType, activeSetName, savedSetsOpen, setSavedSetsOpen } = useSavedSetsContext();
  const { buttonError, checkForSetNameMatch } = savedSetsLib();
  const { appState, saveSet, saveLoadout, newEmptyLoadout } = useLocalStorage();

  const {ref} = useDroppable({id: "saved-sets-panel"})
  const isCatalogPage = useMatch("/catalog")

  useEffect(() => {
    checkForSetNameMatch()
  }, [appState.activeSet])

  return (
    <div className='saved-sets__container' 
      style={!savedSetsOpen ? { 
        transform: `translateX(-100%)`,
        width: "0",
        flex: "0",
      } : {}}
    >
      <div className='saved-sets' style={{display: savedSetsOpen ? "initial" : "none"}}>
        <div className="saved-sets-panel" ref={ref}>

          {!isCatalogPage && appState.activeSet.length < 1 && <h1>Select a set...</h1>}
          {!isCatalogPage && appState.activeSet.length > 0 && 
            (activeSetName === null
            ? <h1 
                className="setbutton"
                onClick={() => {
                  currentSetType === "Sets" && saveSet("New Set", appState.activeSet);
                  currentSetType === "Loadouts" && saveLoadout("New Loadout", appState.activeLoadout);
                }}
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
            {currentSetType === "Loadouts" && Object.keys(appState.loadouts).map((loadout, i) => (
              <SavedLoadout loadoutname={loadout} loadout={appState.loadouts[loadout]} index={i} />
            ))}
          </div>

          {!appState["saved" + currentSetType] || Object.keys(appState["saved" + currentSetType]).length === 0 &&
            <div className="no-saved-sets">
              <p>No saved {currentSetType} yet!</p>
            </div>
          }

          <div className="saved-sets__new-set-button" 
            onClick={() => {
              currentSetType === "Sets" && saveSet("New Set", []);
              currentSetType === "Loadouts" && newEmptyLoadout();
            }}>
            + New Empty Set
          </div>

          {buttonError && <div className="backpack-error-overlay">
            <span>{buttonError}</span>
          </div>}
        </div>
      </div>

      <div className={`saved-sets__thumb ${(savedSetsOpen && !isNotMobile) ? "flip-thumb" : ""}`} onClick={() => setSavedSetsOpen(!savedSetsOpen)}>
        {getIcon({name: "Options", invert: true, size: "1.4em"})}
      </div>
    </div>
  );
}

export default SavedSets;