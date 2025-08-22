import utils from "./utils";
import { Link } from "react-router-dom";

const CardMenu = ({ card, flipFunc, secretFunc }) => {
  return (
    <div className="card-menu">
      <Link to={`/card/${card.cardIDs[0]}`}><button>{utils.getIcon("Inspect", undefined, undefined, "1.5em")}</button></Link>
      {(
        card.transformsInto || 
        card.cardType === "Technology" || 
        card.cardType === "Condition" || 
        card.cardType === "Story" || 
        card.cardType === "Doom"
         ) && (<button onClick={flipFunc}>{utils.getIcon("Flip", undefined, undefined, "1.5em")}</button>
      )}
      {(card.foundIn?.includes("Secret Deck") || card.foundIn?.includes("Envelope")) && (<button onClick={secretFunc}>{utils.getIcon("Reveal", undefined, undefined, "1.5em")}</button>)}
    </div>
  )
}

export default CardMenu;