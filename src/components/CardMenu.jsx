import getIcon from "./utils/iconUtils"

const CardMenu = ({ card, flipFunc, secretFunc, setDisplay }) => {
  return (
    <div className="card-menu">
      <button onClick={setDisplay}>{getIcon({name: "Inspect", size: "1.5em"})}</button>
      {(card.name2 || card.cardType === "Technology") && (<button onClick={flipFunc}>{getIcon({name: "Flip", size: "1.5em"})}</button>)}
      {(card.foundIn?.includes("Secret Deck") || card.foundIn?.includes("Envelope") || card.foundIn === "Ultra-secret") && (<button onClick={secretFunc}>{getIcon({name: "Reveal", size: "1.5em"})}</button>)}
    </div>
  )
}

export default CardMenu;