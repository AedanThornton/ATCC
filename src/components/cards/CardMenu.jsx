import getIcon from "../utils/iconUtils"
import { useSpoilers } from "../../context/SpoilerContext";
import { useSetEditContext } from "../../architecture/editor/set/hooks/SetEditContext";
import { useLocalStorage } from "../../management/localstorage/LocalStorageContext";

const CardMenu = ({ card = {}, flipFunc = ()=>{}, secretFunc = ()=>{}, setDisplay = ()=>{}, variant = "" }) => {
  const { appState, removeFromActiveSet } = useLocalStorage()
  const { handleAddToSet, handleRemoveFromSet } = useSetEditContext()
  const { spoilersEnabled } = useSpoilers();

  return (
    <>
      <button onClick={setDisplay}>{getIcon({name: "Inspect", size: "1.5em", invert: true})}</button>
      {(card.name2 || card.renderType === "Technology") && (<button onClick={flipFunc}>{getIcon({name: "Flip", size: "1.5em", invert: true})}</button>)}
      {(card.foundIn?.includes("Secret Deck") || card.foundIn?.includes("Envelope") || card.foundIn === "Ultra-secret") && (<button disabled={!spoilersEnabled} onClick={secretFunc}>{getIcon({name: "Reveal", size: "1.5em", invert: true})}</button>)}
      {variant === "" && <button disabled={appState.backpack.includes(card.cardIDs[0])} onClick={() => handleAddToSet(card.cardIDs[0])}>{getIcon({name: "Backpack", size: "1.5em", invert: true})}</button>}
      {(variant === "workspace" || variant === "collections") && <button onClick={() => removeFromActiveSet(card.cardIDs[0])}>✖</button>}
    </>
  )
};

export default CardMenu;