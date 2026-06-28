import getIcon from "../utils/iconUtils"
import { useSpoilers } from "../../context/SpoilerContext";
import { useBackpackContext } from "../../context/BackpackContext";
import { useLocalStorage } from "../../context/LocalStorageContext";

const CardMenu = ({ card = {}, flipFunc = ()=>{}, secretFunc = ()=>{}, setDisplay = ()=>{}, variant = "" }) => {
  const { appState, removeFromActiveSet } = useLocalStorage()
  const { handleAddToBackpack, handleRemoveFromBackpack } = useBackpackContext()
  const { spoilersEnabled } = useSpoilers();

  return (
    <div className="card-menu">
      <button onClick={setDisplay}>{getIcon({name: "Inspect", size: "1.5em", invert: true})}</button>
      {(card.name2 || card.renderType === "Technology") && (<button onClick={flipFunc}>{getIcon({name: "Flip", size: "1.5em", invert: true})}</button>)}
      {(card.foundIn?.includes("Secret Deck") || card.foundIn?.includes("Envelope") || card.foundIn === "Ultra-secret") && (<button disabled={!spoilersEnabled} onClick={secretFunc}>{getIcon({name: "Reveal", size: "1.5em", invert: true})}</button>)}
      {variant === "" && <button disabled={appState.backpack.includes(card.cardIDs[0])} onClick={() => handleAddToBackpack(card.cardIDs[0])}>{getIcon({name: "Backpack", size: "1.5em", invert: true})}</button>}
      {variant === "workspace" && <button onClick={() => removeFromActiveSet(card.cardIDs[0])}>✖</button>}
      {variant === "backpack" && <button onClick={() => handleRemoveFromBackpack(card.cardIDs[0])}>✖</button>}
    </div>
  )
};

export default CardMenu;