import React from "react";
import "/src/styles/cardsStyle.css"
import "./AttackCard.css"; // Add corresponding CSS for styling
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
              ? (<div style={{ flex: 1 }} className="ai-card__woo-icon">{wooIcon}</div>)
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
      {startedWithWoO && (<div style={{ flex: 1 }} className="ai-card__woo-icon">{wooIcon}</div>)}
      {!startedWithWoO && (<div style={{ flex: 1 }}></div>)}
      <p style={{ flex: 14 }} key={`${newLines.length}`}>{utils.updateComponent(currentBlock, superindex)}</p>
    </div>)

  return newLines
}

const AttackCard = ({ attack, index }) => {
  return (
    <div key={index} className="ai-card standard fullcard" style={{ color: getColor(attack.cycle) }}>
      {/* Header */}
      <div className="ai-card__header">
        <div className="ai-card__icon-top-left">
          {/* {attack.usedFor && utils.getIcon(attack.usedFor)} */}
        </div>
        <h2 className="ai-card__name" style={{fontSize: Math.min(19, 400 / (1.1 * attack.name.length)) }}>{attack.name}</h2>
        <div className="ai-card__stats-bar-right">
          <div className="stats-bar-right__level-container" style={{ background: getColor(attack.cycle) }}><div className="stats-bar-right__level">{attack.level}</div></div>
          <div className="stats-bar-right__dice">
            <span className="stats-bar-right__dice-value">{attack.dice}</span>
            {utils.getIcon("d10")}
          </div>
          <div className="stats-bar-right__difficulty">{attack.difficulty}+</div>
          <div className="ai-card__stats-background"></div>
        </div>
      </div>

      {/* Flavor Text */}
      {attack.flavor && <p className="ai-card__flavor">{attack.flavor}</p>}

      {/* Targeting */}
      <div className="ai-card__targeting">
        <div className="ai-card__action-line">
          <span style={{ width: "6.66%" }}></span>
          <span className="ai-card__section-header ai-card__section-header--target" style={{backgroundColor: getColor(attack.cycle)}}>TARGET</span>
        </div>
        <div className="ai-card__targeting-list">
          {attack.targeting?.map((line, index) => (
            <span key={index} style={{ display: "flex" }}>
              <span style={{ paddingLeft: `${100 / 15}%` }}></span>
              <span style={{ flex: 14 }}><span style={{ fontWeight: "bold" }}>{line.type}</span> {line.target}.</span>
            </span>
          )
          )}
        </div>
      </div>

      {/* Action Section */}
      <div className="ai-card__action">
        <div className="ai-card__action-line">
          {/* WoO */}
          {attack.preActionWoO && (<div className="ai-card__woo-icon">{wooIcon}</div>)}
          
          {/* Header */}
          <span className="ai-card__section-header ai-card__section-header--action" style={{backgroundColor: getColor(attack.cycle)}}>
            MOVE & {attack.preAction && attack.preAction.toUpperCase() + " & "}{attack.attackType.toUpperCase().includes("JUDGEMENT") ? "JUDGE" : "ATTACK"}
          </span>
          
          {/* Banners */}
          {attack.attackBanners?.map((banner, index) => (
            <span key={index} className="ai-card__attack-banner" style={{backgroundColor: getGateColor(banner.gate.gateType)}}>
              {utils.getIcon(banner.gate?.gateType, undefined, "icon-" + index)} {banner.gate?.gateValue}: {utils.updateComponent(banner.effect, index)}
            </span>
          ))}
        </div>
        <div className="ai-card__consequences-list">
          {parseLines(attack.consequences, "consequences")}
        </div>
      </div>

      {/* After Attack Section */}
      {attack.afterAttackEffects?.length > 0 && (
        <div className="ai-card__after-attack">
          <div className="ai-card__action-line"> {/* Reuse style for alignment */}
            {attack.preAfterAttackWoO && (<div className="ai-card__woo-icon">{wooIcon}</div>)}
            <span className="ai-card__section-header ai-card__section-header--after-attack" style={{backgroundColor: getColor(attack.cycle)}}>AFTER {attack.afterFinal && "FINAL"} ATTACK</span>
          </div>
          <div className="ai-card__after-attack-list">
            {parseLines(attack.afterAttackEffects, "afterattack")}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="ai-card__footer" style={{backgroundColor: getColor(attack.cycle)}}>
        <span className="ai-card_footer-div ai-card__id" style={{color: getCycleFontColor(attack.cycle)}}>ID: {attack.cardIDs?.[0]}</span>
        <span className="ai-card_footer-div ai-card__type-indicator" style={{color: getCycleFontColor(attack.cycle)}}>
          {getAttackType(attack.attackType, attack.subtype)}
        </span>
        <div className="ai-card_footer-div"></div>
      </div>
    </div>
  );
};

const getAttackType = (type, subtype) => {
  if (subtype !== "AI") return subtype.toUpperCase()

  type = type.toUpperCase()
  type = type.includes("JUDGEMENT") ? type : type.replace("REGULAR", "") + " ATTACK"
  return type
}

// Helper functions for styling
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

export default AttackCard;
