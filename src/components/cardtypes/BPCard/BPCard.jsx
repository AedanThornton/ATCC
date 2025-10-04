import React from "react";
import "/src/styles/cardsStyle.css"
import "./BPCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import {getCyclePrimaryColor, getCycleSecondaryColor, isAdversary} from "../../../lib/colors.js"

const wooIcon = utils.getIcon("WoO", undefined, undefined, "1.3em")

const parseLines = (lines, superindex) => {
  const newLines = []
  let currentBlock = "";
  let startedWithWoO = false

  lines.forEach((line, index) => {
    if (line.WoO) {
      if (currentBlock.length > 0) {
        newLines.push(
          <div key={`${newLines.length}`} style={{ display: "flex" }}>
            {startedWithWoO
              ? (<div style={{ width: "6.66%" }} className="bp-card__woo-icon">{wooIcon}</div>)
              : (<div style={{ width: "6.66%" }}></div>)}
            <p style={{ width: "93.33%" }}>{utils.updateComponent(currentBlock, index)}</p>
          </div>)
        currentBlock = ""
      }
      startedWithWoO = true
    }

    currentBlock += line.effect + ". "
  })
  newLines.push(
    <div key={newLines.length} style={{ display: "flex" }}>
      {startedWithWoO 
        ? (<div style={{ width: "6.66%" }} className="bp-card__woo-icon">{wooIcon}</div>)
        : (<div style={{ width: "6.66%" }}></div>)}
      <p style={{ width: "93.33%" }} key={`${newLines.length}`}>{utils.updateComponent(currentBlock, superindex)}</p>
    </div>)

  return newLines
}

const BPCard = ({ bp, index }) => {
  return (
    <div key={index} className={`card bp-card ${bp.cardSize.replace(" ", "-").toLowerCase()}`} style={{ color: getCyclePrimaryColor(isAdversary[bp.usedFor] ? "Adversary" : bp.cycle) }}>
      {/* Header, Icon, and Banner */}
      <div className="bp-card__header">
        <div className="bp-card__icon-top-left">
          {/* {bp.usedFor && utils.getIcon(bp.usedFor)} */}
        </div>
        <h2 className="bp-card__name" style={{fontSize: Math.min(19, 400 / (1.1 * bp.name.length)) }}>{bp.name}</h2>
        <div className="bp-card__stats-bar-right">
          <div className="stats-bar-right__level-container" style={{ background: getCyclePrimaryColor(isAdversary[bp.usedFor] ? "Adversary" : bp.cycle) }}><div className="stats-bar-right__level">{bp.level}</div></div>
          <div className="bp-card__stats-background" style={{ backgroundColor: getCycleSecondaryColor(isAdversary[bp.usedFor] ? "Adversary" : bp.cycle)}}></div>
        </div>
      </div>

      <div className="bp-card__main-body">
        {/* Resources Section */}
        <div className="bp-card__resources-container" style={{ borderColor: getCyclePrimaryColor(isAdversary[bp.usedFor] ? "Adversary" : bp.cycle) }}>
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
        <div className="bp-card__value-container">
          <span style={{ background: getCyclePrimaryColor(isAdversary[bp.usedFor] ? "Adversary" : bp.cycle) }}>
            {utils.getIcon("AT", undefined, undefined, "20px")}
            {` `}
            {bp.value}
          </span>
        </div>

        {/* Non-Response Text Section */}
        <div className="bp-card__critical-list"> {/* Reuse style for alignment */}
          {bp.nonResponseText}
        </div>

        {/* Responses Section */}
        <div className="bp-card__responses">
          {bp.responses?.map((response, index) => (
            <React.Fragment key={index}>
              <div className="bp-card__responses-line">          
                {/* Header */}
                <span className="bp-card__section-header bp-card__section-header--response" style={{backgroundColor: getResponseColor(response.type)}}>
                  {response.type && response.type.toUpperCase()}
                </span>
              </div>
              <div className="bp-card__effects-list">
                {parseLines(response.effects, "effects")}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Crit Response Section */}
        <div className="bp-card__critical-response">
          <div className="bp-card__responses-line"> {/* Reuse style for alignment */}
            <span className="bp-card__section-header bp-card__section-header--response" style={{backgroundColor: getResponseColor("critical")}}>CRITICAL</span>
          </div>
          <div className="bp-card__critical-flavor">
            {bp.critFlavor}
          </div>
          <div className="bp-card__critical-list">
            {/*parseLines(*/utils.updateComponent(bp.critResponse)/*, "crit")*/}.
          </div>
        </div>

        {/* Footer */}
        <div className="bp-card__footer" style={{backgroundColor: getCyclePrimaryColor(isAdversary[bp.usedFor] ? "Adversary" : bp.cycle)}}>
          <span className="bp-card_footer-div bp-card__id">ID: {bp.cardIDs?.[0]}</span>
          <span className="bp-card_footer-div bp-card__type-indicator">
            BODY PART
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

  return responseColors[type.toLowerCase()] || "#000"
}

export default BPCard;