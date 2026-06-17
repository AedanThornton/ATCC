import getIcon from "../utils/iconUtils"
import { useSpoilers } from "../../context/SpoilerContext";
import { useLocalStorage } from "../../context/LocalStorageContext";

const CardMenu = ({ card, flipFunc, secretFunc, setDisplay, inBackpack = false }) => {
  const { addToBackpack, removeFromBackpack } = useLocalStorage();
  const { spoilersEnabled } = useSpoilers();
  return (
    <div className="card-menu">
      <button onClick={setDisplay}>{getIcon({name: "Inspect", size: "1.5em", invert: true})}</button>
      {(card.name2 || card.renderType === "Technology") && (<button onClick={flipFunc}>{getIcon({name: "Flip", size: "1.5em", invert: true})}</button>)}
      {(card.foundIn?.includes("Secret Deck") || card.foundIn?.includes("Envelope") || card.foundIn === "Ultra-secret") && (<button disabled={!spoilersEnabled} onClick={secretFunc}>{getIcon({name: "Reveal", size: "1.5em", invert: true})}</button>)}
      {!inBackpack && <button onClick={() => addToBackpack(card.cardIDs[0])}>{getIcon({name: "Backpack", size: "1.5em", invert: true})}</button>}
      {inBackpack && <button onClick={() => removeFromBackpack(card.cardIDs[0])}>✖</button>}
    </div>
  )
};

export default CardMenu;