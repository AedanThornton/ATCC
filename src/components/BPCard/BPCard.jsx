import React from "react";
import "./BPCard.css"; // Add corresponding CSS for styling
import utils from "../utils/index.jsx";

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
              ? (<div style={{ flex: 1 }} className="bp-card__woo-icon">{wooIcon}</div>)
              : (<div style={{ flex: 1 }}></div>)}
            <p style={{ flex: 14 }}>{utils.updateComponent(currentBlock, index)}</p>
          </div>)
        currentBlock = ""
      }
      startedWithWoO = true
    }

    currentBlock += line.effect + ". "
  })
  newLines.push(
    <div key={newLines.length} style={{ display: "flex" }}>
      {startedWithWoO && (<div style={{ flex: 1 }} className="bp-card__woo-icon">{wooIcon}</div>)}
      {!startedWithWoO && (<div style={{ flex: 1 }}></div>)}
      <p style={{ flex: 14 }} key={`${newLines.length}`}>{utils.updateComponent(currentBlock, superindex)}</p>
    </div>)

  return newLines
}

const BPCard = ({ bp, index }) => {
  return (
    <div key={index} className="bp-card standard" style={{ color: getColor(bp.cycle) }}>
      {/* Header, Icon, and Banner */}
      <div className="bp-card__header">
        <div className="bp-card__icon-top-left">
          {/* {bp.usedFor && utils.getIcon(bp.usedFor)} */}
        </div>
        <h2 className="bp-card__name" style={{fontSize: Math.min(19, 400 / (1.1 * bp.name.length)) }}>{bp.name}</h2>
        <div className="bp-card__stats-bar-right">
          <div className="stats-bar-right__level-container" style={{ background: getColor(bp.cycle) }}><div className="stats-bar-right__level">{bp.level}</div></div>
          <div className="stats-bar-right__resources">{bp.difficulty}</div>
          <div className="bp-card__stats-background"></div>
        </div>
      </div>

      {/* AT Section */}
      {utils.getIcon("AT")}
      {bp.value}

      {/* Non-Response Text Section */}
      {bp.nonResponseText}

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
          {bp.preAfterBPWoO && (<div className="bp-card__woo-icon">{wooIcon}</div>)}
          <span className="bp-card__section-header bp-card__section-header--response" style={{backgroundColor: getResponseColor("critical")}}>CRITICAL</span>
        </div>
        <div className="bp-card__critical-flavor">
          {bp.critFlavor}
        </div>
        <div className="bp-card__critical-list">
          {/*parseLines(*/bp.critResponse/*, "crit")*/}
        </div>
      </div>

      {/* Footer */}
      <div className="bp-card__footer" style={{backgroundColor: getColor(bp.cycle)}}>
        <span className="bp-card_footer-div bp-card__id" style={{color: getCycleFontColor(bp.cycle)}}>{bp.cardIDs?.[0]}</span>
        <span className="bp-card_footer-div bp-card__type-indicator" style={{color: getCycleFontColor(bp.cycle)}}>
          BODY PART
        </span>
        <div className="bp-card_footer-div"></div>
      </div>
    </div>
  );
};

// Helper functions for styling
const getResponseColor = (type) => {
  const responseColors = {
    "fail": "#F78102",
    "wound": "rgb(155, 35, 21)",
    "instinct": "#0000FF",
    "critical": "#000"
  }
}

const getColor = (cycle) => {
  const cycleColors = {
    "Cycle I": "#270F03",
    "Cycle II": "rgb(77, 18, 11)",
    "Cycle III": "#543560",
    "Cycle IV": "#131004",
    "Cycle V": "#05233B",
    "Mnestis Theatre": "#C59A18",
    "Mnestis": "#C59A18",
  };
  return cycleColors[cycle] || "#FFFFFF";
};

const getCycleFontColor = (cycle) => {
  const cycleColors = {
    "Cycle I": "#FFFFFF",
    "Cycle II": "rgb(199, 43, 26)",
    "Cycle III": "#FFFFFF",
    "Cycle IV": "#E7CC68",
    "Cycle V": "#FFFFFF",
    "Mnestis Theatre": "#FFFFFF",
    "Mnestis": "#FFFFFF",
  };
  return cycleColors[cycle] || "#FFFFFF";
};

const getGateColor = (gatetype) => {
  gatetype = gatetype.toLowerCase()
  const gateColors = {
    hits: "rgb(155, 35, 21)",
    danger: "rgb(155, 35, 21)",
    fate: "#557DBD",
    rage: "#040404",
    ambrosia: "#5D0D69",
    bleed: "#040404",
    labyrinth: "#7D4921",
    despair: "#0E5653",
    condition: "#C09513",
    "danger+fate": "linear-gradient(90deg, rgba(155,35,21,1) 38%, rgba(34,85,167,1) 62%)",
    midas: "131004",
  };
  return gateColors[gatetype] || "#AAAAAA";
};

export default BPCard;