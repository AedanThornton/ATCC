import React from "react";
import "/src/styles/cardsStyle.css"
import "./TraitLikeCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import { getCyclePrimaryColor, getCycleSecondaryColor, isAdversary, adversaryPrimaryColor, getCycleTextColor } from "../../../lib/colors.js"
import getIcon from "../../utils/iconUtils.jsx";

const TraitLikeCard = ({ traitlike, index, isDahaka = false }) => {
  const colorInput = isAdversary[traitlike.usedFor] ? "Adversary" : traitlike.cycle

  return (
    <div
      key={index} className={`card traitlike-card ${traitlike.cardSize.replace(" ", "-").toLowerCase()}`}
      style={{
        color: isDahaka ? "black" : getCyclePrimaryColor(colorInput),
        backgroundColor: isAdversary[traitlike.usedFor] && (isDahaka ? getCycleSecondaryColor(colorInput) : adversaryPrimaryColor),
        borderTopLeftRadius: isDahaka && 0,
        borderTopRightRadius: isDahaka && 0,
      }}
    >
      {/* Header, Icon, and Banner */}
      <div className="traitlike-card__header">
        <div className="traitlike-card__icon-top-left" style={{ borderColor: getCyclePrimaryColor(colorInput), border: isDahaka && "none" }}>
          {/* {traitlike.usedFor && getIcon({name: traitlike.usedFor})} */}
        </div>
        <h2 className="traitlike-card__name" style={{ fontSize: Math.min(19, 400 / (1.1 * traitlike.name.length)) }}>{traitlike.name}</h2>
        <div className="traitlike-card__stats-bar-right" style={{ color: getCycleTextColor(colorInput) }}>
          <div
            className="stats-bar-right__level-container"
            style={{
              background: isDahaka ? adversaryPrimaryColor : getCyclePrimaryColor(colorInput),
              borderColor: isDahaka ? "white" : getCycleTextColor(colorInput),
              color: isDahaka && "white"
            }}>
            <div className="stats-bar-right__level">{traitlike.level}</div>
          </div>
        </div>
      </div>

      <div className="traitlike-card__main-body">
        <div className="traitlike-card__text">
          <i>
            {traitlike.flavor}
          </i>

          <div><FormattedParagraph paragraph={traitlike.effects} invertIcons={isAdversary[traitlike.usedFor]} /></div>
        </div>

        {/* Footer */}
        <div className="traitlike-card__footer" style={{ backgroundColor: isDahaka ? getCycleSecondaryColor(colorInput) : getCyclePrimaryColor(colorInput), color: getCycleTextColor(colorInput) }}>
          <span className="traitlike-card_footer-div traitlike-card__id" >ID: {traitlike.cardIDs?.[0]}</span>
          <span className="traitlike-card_footer-div traitlike-card__type-indicator" >
            {traitlike.cycle.includes("Mnestis") && "MNESTIS "}{traitlike.actualCardType.toUpperCase()}
          </span>
          <div className="traitlike-card_footer-div"></div>
        </div>
      </div>
    </div>
  );
};

export default TraitLikeCard;