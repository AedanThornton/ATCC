import React from "react";
import "/src/styles/cardsStyle.css"
import "./FatedMnemosCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index";

const FatedMnemosCard = ({ fatedMnemos, index }) => {
  return (
    <div className="fated-mnemos mini-american fullcard">
      {/* FatedMnemos Info */}
      <div className="fated-mnemos-title">
        <div style={{lineHeight: "19px", fontSize: Math.min(19, 300 / (1.2 * fatedMnemos.name.length)) }}>
            {fatedMnemos.name.toUpperCase()}
        </div>
        <div style={{fontSize: "14px", color: "gray" }}>
            {fatedMnemos.traits[0].toUpperCase()} - {fatedMnemos.traits[1].toUpperCase()} - {fatedMnemos.traits[2].toUpperCase()}
        </div>
      </div>

      <div className="fated-mnemos-flavor" style={{lineHeight: "14px"}}>
        {fatedMnemos.flavor}
      </div>

      <div className="fated-mnemos-effect-box">
        <div className="fated-mnemos-effect">{utils.updateComponent(fatedMnemos.effect)}</div>
      </div>

      <div className="card-info" style={{lineHeight: "14px"}}>
          {utils.createStatTitle(fatedMnemos.stats[0], "#FFF", "#000", "-1")}
          {fatedMnemos.stats[1] && utils.createStatTitle(fatedMnemos.stats[1], "#FFF", "#000", "-1")}
      </div>

      <div className="fated-mnemos-growth-title">
        GROWTH
      </div>

      <div className="fated-mnemos-effect-box">
        <div className="fated-mnemos-effect-header">{fatedMnemos.growthName}</div>
        <div className="fated-mnemos-effect">{utils.updateComponent(fatedMnemos.growthAbility)}</div>
      </div>

      <div>
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">Cycle:</div>
            <div className="card-info-detail">{fatedMnemos.cycle}</div>
        </div>
        <div className="card-info centered" style={{lineHeight: "14px"}}>
            <div className="card-info-header">ID:</div>
            <div className="card-info-detail">{fatedMnemos.cardIDs}</div>
        </div>
      </div>

    </div>
  );
};

export default FatedMnemosCard;