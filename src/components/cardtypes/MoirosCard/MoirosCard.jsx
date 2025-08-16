import "/src/styles/cardsStyle.css"
import "./MoirosCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

const MoirosCard = ({ moiros, index }) => {
  return (
    <div className={`card moiros ${moiros.cardSize.replace(" ", "-").toLowerCase()}`} key={index}>
      <div>
        <div className="moiros-title" style={{ fontSize: Math.min(19, 400 / (1.1 * moiros.name.length)) }}>
          {moiros.name.toUpperCase()}
        </div>

        {/* Effects */}
        <div className="moiros-effects">{utils.updateComponent(moiros.effects)}</div>
      </div>

      {/* Info */}
      <div>
        <div className="moiros-info">Card Info</div>

        <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
          <div className="card-info-header">ID(s)</div>
          <div className="card-info-detail">{moiros.cardIDs.join(", ")}</div>
        </div>
        <div className="card-info centered">
          <div className="card-info-header">Cycle</div>
          <div className="card-info-detail">{moiros.cycle}</div>
        </div>
      </div>
      
    </div>
  );
};

export default MoirosCard;
