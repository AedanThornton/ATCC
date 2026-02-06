import "/src/styles/cardsStyle.css"
import "./ArgonautCard.css"; // Add corresponding CSS for styling
import StatTitle from "../../utils/StatTitle"

const ArgonautCard = ({ argonaut, index }) => {
  return (
    <div className={`card argonaut ${argonaut.cardSize.replace(" ", "-").toLowerCase()}`}>
      <div className="argonaut-flavor" style={{ lineHeight: "14px", marginBottom: "4px" }}>
        {argonaut.flavor}.
      </div>

      {/* Argonaut Info */}
      <div className="argonaut-name-box">
        <div className="argonaut-title" style={{ lineHeight: "19px", fontSize: Math.min(19, 300 / (1.2 * argonaut.name.length)) }}>
          {argonaut.name.toUpperCase()}
        </div>
        <div className="argonaut-info" style={{ lineHeight: "14px" }}>
          <StatTitle text={argonaut.stat} color={"#000"} bkgdColor={"#F9C344"} />
        </div>
        <div className="argonaut-info bottom-row centered" style={{ lineHeight: "14px" }}>
          <div className="card-info-header">ID:</div>
          <div className="card-info-detail">{argonaut.cardIDs}</div>
        </div>
      </div>
    </div>
  );
};

export default ArgonautCard;
