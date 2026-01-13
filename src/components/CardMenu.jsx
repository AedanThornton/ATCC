import getIcon from "./utils/iconUtils"

const CardMenu = ({ card, flipFunc, secretFunc, setDisplay }) => {
  return (
    <div className="card-menu">
      {/*<Link to={`/card/${card.cardIDs[0]}`}><button>{getIcon("Inspect", undefined, undefined, "1.5em")}</button></Link>*/}
      <button onClick={setDisplay}>{getIcon("Inspect", undefined, undefined, "1.5em")}</button>
      {(card.name2 || card.cardType === "Technology") && (<button onClick={flipFunc}>{getIcon("Flip", undefined, undefined, "1.5em")}</button>)}
      {(card.foundIn?.includes("Secret Deck") || card.foundIn?.includes("Envelope") || card.foundIn === "Ultra-secret") && (<button onClick={secretFunc}>{getIcon("Reveal", undefined, undefined, "1.5em")}</button>)}
    </div>
  )
}

export default CardMenu;