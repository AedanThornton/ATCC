import React from "react";
import "/src/styles/cardsStyle.css"
import "./AttackCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import {getCyclePrimaryColor, getCycleSecondaryColor, getGateColor, getCycleTextColor} from "../../../lib/colors.js"

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
    <div key={index} className={`card ai-card ${attack.cardSize.replace(" ", "-").toLowerCase()}`} style={{ color: getCyclePrimaryColor(attack.cycle) }}>
      {/* Header */}
      <div className="ai-card__header">
        <div className="ai-card__icon-top-left" style={{ background: getCyclePrimaryColor(attack.cycle), color: getCycleSecondaryColor(attack.cycle) }}>
          {/* {attack.usedFor && utils.getIcon(attack.usedFor)} */}
        </div>
        <h2 className="ai-card__name" style={{fontSize: Math.min(19, 400 / (1.1 * attack.name.length)) }}>{attack.name}</h2>
        <div className="ai-card__stats-bar-right">
          <div className="stats-bar-right__level-container" style={{ background: getCyclePrimaryColor(attack.cycle) }}><div className="stats-bar-right__level">{attack.level}</div></div>
          <div className="stats-bar-right__dice">
            <span className="stats-bar-right__dice-value">{attack.dice}</span>
            {utils.getIcon("d10")}
          </div>
          <div className="stats-bar-right__difficulty">{attack.difficulty}+</div>
          <div className="ai-card__stats-background" style={{ background: getCycleSecondaryColor(attack.cycle) }}></div>
        </div>
      </div>

      <div className="ai-card_main-body">
        {/* Flavor Text */}
        {attack.flavor && <p className="ai-card__flavor">{attack.flavor}.</p>}

        {/* Targeting */}
        <div className="ai-card__targeting">
          <div className="ai-card__action-line">
            <span style={{ width: "6.66%" }}></span>
            <span className="ai-card__section-header ai-card__section-header--target" style={{backgroundColor: getCyclePrimaryColor(attack.cycle)}}>TARGET</span>
          </div>
          <div className="ai-card__targeting-list">
            {attack.targeting?.map((line, index) => (
              <span key={index} style={{ display: "flex" }}>
                <span style={{ paddingLeft: `${100 / 15}%` }}></span>
                <span style={{ flex: 14 }}><span style={{ fontWeight: "bold" }}>{line.type}</span> {utils.updateComponent(line.target)}.</span>
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
            <span className="ai-card__section-header ai-card__section-header--action" style={{backgroundColor: getCyclePrimaryColor(attack.cycle)}}>
              MOVE & {attack.preAction && attack.preAction.toUpperCase() + " & "}{attack.attackType.toUpperCase().includes("JUDGEMENT") ? "JUDGE" : "ATTACK"}
            </span>
            
            {/* Banners */}
            {attack.attackBanners?.map((banner, index) => (
              <span key={index} className="ai-card__attack-banner" style={{backgroundColor: getGateColor(banner.gate?.gateType || "danger")}}>
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
              <span className="ai-card__section-header ai-card__section-header--after-attack" style={{backgroundColor: getCyclePrimaryColor(attack.cycle)}}>AFTER {attack.afterFinal && "FINAL"} ATTACK</span>
            </div>
            <div className="ai-card__after-attack-list">
              {parseLines(attack.afterAttackEffects, "afterattack")}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="ai-card__footer" style={{backgroundColor: getCycleSecondaryColor(attack.cycle)}}>
          <span className="ai-card_footer-div ai-card__id" style={{color: getCycleTextColor(attack.cycle)}}>ID: {attack.cardIDs?.[0]}</span>
          <span className="ai-card_footer-div ai-card__type-indicator" style={{color: getCycleTextColor(attack.cycle)}}>
            {getAttackType(attack.attackType, attack.subtype)}
          </span>
          <div className="ai-card_footer-div"></div>
        </div>
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

export default AttackCard;
