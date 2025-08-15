import React from "react";
import "/src/styles/cardsStyle.css"
import "./BPCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";

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
    <div key={index} className={`bp-card ${bp.cardSize.replace(" ", "-").toLowerCase()} card`} style={{ color: getPrimaryCycleColor(bp.cycle) }}>
      {/* Header, Icon, and Banner */}
      <div className="bp-card__header">
        <div className="bp-card__icon-top-left">
          {/* {bp.usedFor && utils.getIcon(bp.usedFor)} */}
        </div>
        <h2 className="bp-card__name" style={{fontSize: Math.min(19, 400 / (1.1 * bp.name.length)) }}>{bp.name}</h2>
        <div className="bp-card__stats-bar-right">
          <div className="stats-bar-right__level-container" style={{ background: getPrimaryCycleColor(bp.cycle) }}><div className="stats-bar-right__level">{bp.level}</div></div>
          <div className="bp-card__stats-background" style={{ backgroundColor: getSecondaryCycleColor(bp.cycle)}}></div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="bp-card__resources-container" style={{ borderColor: getPrimaryCycleColor(bp.cycle) }}>
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
        <span style={{ background: getPrimaryCycleColor(bp.cycle) }}>
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
          {/*parseLines(*/bp.critResponse/*, "crit")*/}
        </div>
      </div>

      {/* Footer */}
      <div className="bp-card__footer" style={{backgroundColor: getPrimaryCycleColor(bp.cycle)}}>
        <span className="bp-card_footer-div bp-card__id">ID: {bp.cardIDs?.[0]}</span>
        <span className="bp-card_footer-div bp-card__type-indicator">
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
    "fail": "rgb(228, 99, 8)",
    "wound": "rgb(155, 35, 21)",
    "instinct": "rgb(36, 48, 153)",
    "critical": "#000"
  }

  return responseColors[type.toLowerCase()] || "#000"
}

const getPrimaryCycleColor = (cycle) => {
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

const getSecondaryCycleColor = (cycle) => {
  const cycleColors = {
    "Cycle I": "#743e27",
    "Cycle II": "rgb(133, 24, 12)",
    "Cycle III": "#FFFFFF",
    "Cycle IV": "#E7CC68",
    "Cycle V": "#FFFFFF",
    "Mnestis Theatre": "#FFFFFF",
    "Mnestis": "#FFFFFF",
  };
  return cycleColors[cycle] || "#FFFFFF";
};

export default BPCard;