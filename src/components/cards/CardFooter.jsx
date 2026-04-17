const CardFooter = ({ cardIDs, bkgdColor = "unset", color = "white" }) => {
  return <div className="card__footer" style={{backgroundColor: bkgdColor, color: color}}>
    <span className="card_footer-div ai-card__id">ID(s): {cardIDs?.join(", ")}</span>
  </div>
}

export default CardFooter