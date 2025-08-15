import React from "react";
import "/src/styles/cardsStyle.css"
import "./ArgonautCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index";

const ArgonautCard = ({ argonaut, index }) => {
  return (
    <div className={`card argonaut ${argonaut.cardSize.replace(" ", "-").toLowerCase()}`}>
      <div className="argonaut-flavor" style={{ lineHeight: "14px", marginBottom: "4px" }}>
        {argonaut.flavor}
      </div>

      {/* Argonaut Info */}
      <div>
        <div className="argonaut-title" style={{ lineHeight: "19px", fontSize: Math.min(19, 300 / (1.2 * argonaut.name.length)) }}>
          {argonaut.name.toUpperCase()}
        </div>
        <div className="argonaut-info" style={{ lineHeight: "14px" }}>
          {utils.createStatTitle(argonaut.stat, "#000", "#F9C344")}
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
