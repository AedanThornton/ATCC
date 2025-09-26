import utils from "./utils";
import { Link } from "react-router-dom";

const CardMenu = ({ card, flipFunc, secretFunc, setDisplay }) => {
  return (
    <div className="card-menu">
      {/*<Link to={`/card/${card.cardIDs[0]}`}><button>{utils.getIcon("Inspect", undefined, undefined, "1.5em")}</button></Link>*/}
      <button onClick={setDisplay}>{utils.getIcon("Inspect", undefined, undefined, "1.5em")}</button>
      {(card.name2 || card.cardType === "Technology") && (<button onClick={flipFunc}>{utils.getIcon("Flip", undefined, undefined, "1.5em")}</button>)}
      {(card.foundIn?.includes("Secret Deck") || card.foundIn?.includes("Envelope")) && (<button onClick={secretFunc}>{utils.getIcon("Reveal", undefined, undefined, "1.5em")}</button>)}
    </div>
  )
}

export default CardMenu;