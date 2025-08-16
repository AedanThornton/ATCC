import "/src/styles/cardsStyle.css"
import "./TraumaCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

const TraumaCard = ({ trauma, index }) => {
  return (
    <div className={`card trauma ${trauma.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      {trauma.subtype !== "Obol" && (
      <div>
        <div className="trauma-title">
          <div style={{lineHeight: "26px", fontSize: Math.min(18, 300 / (1 * trauma.name.length))}}>
              {trauma.name.toUpperCase()}
          </div>
          {trauma.cycle !== "ALL" && <div className="trauma-subtitle">
              {trauma.cycle.toUpperCase()} ONLY
          </div>}
        </div>

        {trauma.flavor && <div className="trauma-flavor">
          "{trauma.flavor}"
        </div>}

        <div className="trauma-text">
          {utils.updateComponent(trauma.effects)}
        </div>
      </div>
      )}

      {trauma.subtype === "Obol" && (
        <div style={{height: "100%", backgroundColor: `${trauma.name.toUpperCase().includes("LIVE") ? "white" : "black"}`, color: `${trauma.name.toUpperCase().includes("LIVE") ? "black" : "white"}`}}>
          <div style={{height: "15%"}}></div>
          <div className="trauma-title">{trauma.name.toUpperCase()}</div>
          <div className="trauma-flavor">"{trauma.flavor}"</div>
          <div className={`trauma-text ${trauma.name.toUpperCase().includes("LIVE") ? "" : "you-died"}`}>
            {utils.updateComponent(trauma.effects)}
          </div>
        </div>
      )}

      <div>
        {/* Bottom Bar */}
        {trauma.subtype !== "Obol" && (
        <div className="trauma-bottom-bar">
          {trauma.subtype === "Minor" 
            ? <div>{utils.getIcon(trauma.arrow)}</div>
            : trauma.subtype === "Major" 
              ? <div style={{fontSize: "18px"}}>{trauma.number}</div>
              : <div></div>
          }
          <div>{utils.getIcon(trauma.subtype)}{trauma.sign}</div>
        </div>
        )}
        

        {/* Info */}
        <div className="trauma-info">Card Info</div>
        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{trauma.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{trauma.cycle}</div>
        </div>
      </div>

    </div>
  );
};

export default TraumaCard;
