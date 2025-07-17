import React from "react";
import "/src/styles/cardsStyle.css"
import "./ExplorationCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

const ExplorationCard = ({ exploration, index }) => {
  return (
    <div className="exploration mini-american fullcard">
      {/* Exploration Info */}
      <div className="exploration-title" style={{lineHeight: "19px", fontSize: Math.min(19, 300 / (1.2 * exploration.name.length)) }}>
        {exploration.name.toUpperCase()}
      </div>

      <div className="exploration-effects"> {/* ############## Expand this with more detailed formatting for effect lines and gates */}
        <p>{exploration.effects}</p>
      </div>

      {exploration.adversaryTriggers && (
        <div className="adversary-icon-group">
          {[...Array(exploration.adversaryTriggers)].map((e, index) => (
            <div className="adversary-icon">
              {utils.getIcon("Adversary", undefined, index, "3em")}
            </div>
          ))}
        </div>
      )}

      <div className="exploration-footer">
        <div>{exploration.number && (<div className="exploration-footer__number-circle">{exploration.number}</div>)}</div>
        <div className="exploration-footer__remove-effect">{exploration.removeEffect}</div>
        <div>{utils.getIcon(exploration.stackType.replace(" ", ""), undefined, undefined, "2.8em")}</div>
      </div>

      <div>
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Cycle:</div>
            <div className="card-info-detail">{exploration.cycle}</div>
        </div>
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">ID:</div>
            <div className="card-info-detail">{exploration.cardIDs}</div>
        </div>
      </div>

    </div>
  );
};

export default ExplorationCard;