import React from "react";
import "/src/styles/cardsStyle.css"
import "./BPCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../FormattedParagraph.jsx";
import { getCyclePrimaryColor, getCycleSecondaryColor, isAdversary, adversaryPrimaryColor, getCycleTextColor } from "../../../lib/colors.js"
import getIcon from "../../utils/iconUtils.jsx";

const wooIcon = getIcon("WoO", undefined, undefined, "1.3em")

const parseLines = (lines, superindex) => {
  const newLines = []
  let currentBlock = [];
  let startedWithWoO = false

  lines.forEach((line, index) => {
    if (line.WoO) {
      if (currentBlock.length > 0) {
        newLines.push(
          <div key={`${newLines.length}`} style={{ display: "flex" }}>
            {startedWithWoO
              ? (<div style={{ width: "6.66%" }} className="bp-card__woo-icon">{wooIcon}</div>)
              : (<div style={{ width: "6.66%" }}></div>)}
            <p style={{ width: "93.33%" }}>{currentBlock}</p>
          </div>)
        currentBlock = []
      }
      startedWithWoO = true
    }

    currentBlock.push(<FormattedParagraph paragraph={line.effect} />)
  })
  newLines.push(
    <div key={newLines.length} style={{ display: "flex" }}>
      {startedWithWoO
        ? (<div style={{ width: "6.66%" }} className="bp-card__woo-icon">{wooIcon}</div>)
        : (<div style={{ width: "6.66%" }}></div>)}
      <p style={{ width: "93.33%" }} key={`${newLines.length}`}>{currentBlock}</p>
    </div>)

  return newLines
}

const BPCard = ({ bp, index, isDahaka = false }) => {
  const colorInput = isAdversary[bp.usedFor] ? "Adversary" : bp.cycle

  return (
    <div
      key={index} className={`card bp-card ${bp.cardSize.replace(" ", "-").toLowerCase()}`}
      style={{
        color: isDahaka ? "black" : getCyclePrimaryColor(colorInput),
        backgroundColor: isAdversary[bp.usedFor] && (isDahaka ? getCycleSecondaryColor(colorInput) : adversaryPrimaryColor),
        borderTopLeftRadius: isDahaka && 0,
        borderTopRightRadius: isDahaka && 0,
      }}
    >
      {/* Header, Icon, and Banner */}
      <div className="bp-card__header">
        <div className="bp-card__icon-top-left" style={{ borderColor: getCyclePrimaryColor(colorInput), border: isDahaka && "none" }}>
          {/* {bp.usedFor && getIcon(bp.usedFor)} */}
        </div>
        <h2 className="bp-card__name" style={{ fontSize: Math.min(19, 400 / (1.1 * bp.name.length)) }}>{bp.name}</h2>
        <div className="bp-card__stats-bar-right" style={{ color: getCycleTextColor(colorInput) }}>
          <div
            className="stats-bar-right__level-container"
            style={{
              background: isDahaka ? adversaryPrimaryColor : getCyclePrimaryColor(colorInput),
              borderColor: isDahaka ? "white" : getCycleTextColor(colorInput),
              color: isDahaka && "white"
            }}>
            <div className="stats-bar-right__level">{bp.level}</div>
          </div>
          <div className="bp-card__stats-background" style={{ backgroundColor: isDahaka ? adversaryPrimaryColor : getCycleSecondaryColor(colorInput) }}></div>
        </div>
      </div>

      <div className="bp-card__main-body">
        {/* Resources Section */}
        <div className="bp-card__resources-container" style={{ borderColor: getCyclePrimaryColor(colorInput) }}>
          <h3 className="bp-card__resources-title">
            Resources
          </h3>
          <div className="bp-card__resources-list">
            {bp.resources?.map((resource, index) => (
              <div key={index}>
                {`${resource.count}x ${resource.name}`}
              </div>
            ))}
          </div>
        </div>

        {/* AT Section */}
        {bp.value && <div className="bp-card__value-container">
          <span style={{ background: getCyclePrimaryColor(colorInput), color: getCycleTextColor(colorInput), borderColor: getCycleTextColor(colorInput) }} className={!isAdversary[bp.usedFor] && !isDahaka && "invert-icons"}>
            {getIcon("AT", undefined, undefined, "20px")}
            {` `}
            {bp.value}
          </span>
        </div>}

        {/* Non-Response Text Section */}
        {bp.nonResponseText && <div> {/* Reuse style for alignment */}
          <div className="bp-card__responses-line"> {/* Reuse style for alignment */}
            <span className="bp-card__section-header bp-card__section-header--response" style={{ backgroundColor: getCyclePrimaryColor(bp.cycle), outline: `1px solid ${getCyclePrimaryColor(bp.cycle)}` }}>
              {bp.nonResponseText.split(" ")[0]}
            </span>
          </div>
          <div className={`bp-card__critical-list ${isAdversary[bp.usedFor] && !isDahaka && "invert-icons"}`}>
            {bp.nonResponseText.split(" ").slice(1).join(" ")}
          </div>
        </div>}

        {/* Responses Section */}
        <div className="bp-card__responses">
          {bp.responses?.map((response, index) => (
            <React.Fragment key={index}>
              <div className="bp-card__responses-line">
                {/* Header */}
                <span className="bp-card__section-header bp-card__section-header--response" style={{ backgroundColor: getResponseColor(response.type), outline: `1px solid ${getResponseColor(response.type)}` }}>
                  {response.type && response.type.toUpperCase()}
                </span>
              </div>
              <div className={`bp-card__effects-list  ${isAdversary[bp.usedFor] && !isDahaka && "invert-icons"}`}>
                {parseLines(response.effects, "effects")}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Crit Response Section */}
        <div className="bp-card__critical-response">
          {bp.critResponse && <>
            <div className="bp-card__responses-line"> {/* Reuse style for alignment */}
              <span
                className="bp-card__section-header bp-card__section-header--response"
                style={{ backgroundColor: getResponseColor("critical"), outline: `1px solid ${getResponseColor("critical")}` }}
              >
                CRITICAL
              </span>
            </div>
            <div className="bp-card__critical-flavor" style={{ color: isAdversary[bp.usedFor] && !isDahaka && "white" }}>
              {bp.critFlavor}
            </div>
            <div className={`bp-card__critical-list ${isAdversary[bp.usedFor] && !isDahaka && "invert-icons"}`}>
              {bp.critResponse}.
            </div>
          </>}
        </div>

        {/* Footer */}
        <div className="bp-card__footer" style={{ backgroundColor: isDahaka ? getCycleSecondaryColor(colorInput) : getCyclePrimaryColor(colorInput), color: getCycleTextColor(colorInput) }}>
          <span className="bp-card_footer-div bp-card__id" >ID: {bp.cardIDs?.[0]}</span>
          <span className="bp-card_footer-div bp-card__type-indicator" >
            {bp.cardType === "Sig | Rout" ? 'ROUTINE' : 'BODY PART'}
          </span>
          <div className="bp-card_footer-div"></div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for styling
const getResponseColor = (type) => {
  const responseColors = {
    "fail": "rgb(228, 99, 8)",
    "wound": "rgb(155, 35, 21)",
    "instinct": "rgb(36, 48, 153)",
    "critical": "#000"
  }

  if (type.split(" ").length > 1) {
    type = type.split(" ")[1]
  }

  return responseColors[type.toLowerCase()] || "#000"
}

export default BPCard;