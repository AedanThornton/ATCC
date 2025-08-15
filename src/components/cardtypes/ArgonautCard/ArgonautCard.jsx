import React from "react";
import "/src/styles/cardsStyle.css"
import "./ArgonautCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index";

const ArgonautCard = ({ argonaut, index }) => {
  return (
    <div className={`argonaut ${argonaut.cardSize.replace(" ", "-").toLowerCase()} card`}>
        <div className="argonaut-card">
            <div className="argonaut-flavor" style={{lineHeight: "14px", marginBottom: "4px"}}>
                {argonaut.flavor}
            </div>

            {/* Image */}
            {false && ( /* Disabling image rendering for now. Will reenable if loading images in becomes easier */
            <div className="argonaut-image">
                <img src={`./src/assets/images/${argonaut.cardIDs}.png`} alt={argonaut.name} />
            </div>
            )}

            {/* Argonaut Info */}
            <div className="argonaut-title" style={{lineHeight: "19px", fontSize: Math.min(19, 300 / (1.2 * argonaut.name.length)) }}>
                {argonaut.name.toUpperCase()}
            </div>
            <div className="argonaut-info" style={{lineHeight: "14px"}}>
                {utils.createStatTitle(argonaut.stat, "#000", "#F9C344")}
            </div>
            <div className="argonaut-info bottom-row centered" style={{lineHeight: "14px"}}>
                <div className="card-info-header">ID:</div>
                <div className="card-info-detail">{argonaut.cardIDs}</div>
            </div>
        </div>
    </div>
  );
};

export default ArgonautCard;
