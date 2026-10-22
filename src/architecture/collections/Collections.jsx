import { useLocalStorage } from "../../management/localstorage/LocalStorageContext";
import "./styles/collections.css"
import getIcon from "../../components/utils/iconUtils";
import { useEffect } from "react";
import { useDroppable } from "@dnd-kit/react";
import collectionsLib from "./lib/collectionsLib";
import CollectionsSelector from "./components/CollectionsSelector";
import { useCollectionsContext } from "./hooks/CollectionsContext"; 
import { useMatch } from "react-router-dom";
import SavedLoadout from "./components/savetypes/SavedLoadout";
import { SavedSet } from "./components/savetypes/SavedSet";

function Collections() {
  const isNotMobile = window.matchMedia('(hover: hover)').matches;

  const { currentSetType, activeSetName, collectionsOpen, setCollectionsOpen } = useCollectionsContext();
  const { buttonError, checkForSetNameMatch } = collectionsLib();
  const { appState, saveSet, saveLoadout, newEmptyLoadout } = useLocalStorage();

  const {ref} = useDroppable({id: "collections-panel"})
  const isCatalogPage = useMatch("/catalog")

  useEffect(() => {
    checkForSetNameMatch()
  }, [appState.activeSet])

  return (
    <div className='collections__container' 
      style={!collectionsOpen ? { 
        transform: `translateX(-100%)`,
        width: "0",
        flex: "0",
      } : {}}
    >
      <div className='collections' style={{display: collectionsOpen ? "initial" : "none"}}>
        <div className="collections-panel" ref={ref}>

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
                {activeSetName === "Workspace" && <>{getIcon({name: "Backpack", invert: true})} </>}
                {activeSetName === "Current Search" && <>{getIcon({name: "Catalog", invert: true})} </>}
                {activeSetName}
              </h1>
            )
          }

          <SavedSet setname={"Backpack"} set={appState.backpack} index={"backpack"} />
          {appState.searchSet &&
            <SavedSet setname={"Current Search"} set={appState.searchSet} index={"search"} />
          }

          <h2>SAVED</h2>

          <CollectionsSelector />

          <div className="collections__set-list">
            {currentSetType === "Sets" && Object.keys(appState.collections).map((set, i) => (
              <SavedSet setname={set} key={i} />
            ))}
            {currentSetType === "Decks" && Object.keys(appState.collections).map((set, i) => (
              // <SavedSet setname={set} set={appState.collections[set]} index={i} />
              <></>
            ))}
            {currentSetType === "Loadouts" && Object.keys(appState.loadouts).map((loadout, i) => (
              <SavedLoadout loadoutname={loadout} loadout={appState.loadouts[loadout]} key={i} />
            ))}
          </div>

          {!appState["saved" + currentSetType] || Object.keys(appState["saved" + currentSetType]).length === 0 &&
            <div className="no-collections">
              <p>No saved {currentSetType} yet!</p>
            </div>
          }

          <div className="collections__new-set-button" 
            onClick={() => {
              currentSetType === "Sets" && saveSet("New Set", []);
              currentSetType === "Loadouts" && newEmptyLoadout();
            }}>
            + New Empty {currentSetType.slice(0, -1)}
          </div>

          {buttonError && <div className="workspace-error-overlay">
            <span>{buttonError}</span>
          </div>}
        </div>
      </div>

      <div className={`collections__thumb ${(collectionsOpen && !isNotMobile) ? "flip-thumb" : ""}`} onClick={() => setCollectionsOpen(!collectionsOpen)}>
        {getIcon({name: "Options", invert: true, size: "1.4em"})}
      </div>
    </div>
  );
}

export default Collections;