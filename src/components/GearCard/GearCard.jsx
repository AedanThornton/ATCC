import React from "react";
import "./GearCard.css"; // Add corresponding CSS for styling
import utils from "../utils/index.jsx";

const GearCard = ({ gear, index }) => {
  return (
    <div className="gear mini-american" style={{ color: getColor(gear.cycle) }}>
      <>
        {(gear.usedFor.includes("Secret Deck") || gear.usedFor.includes("Envelope")) &&
          (utils.SecretOverlay(gear.usedFor, index + "cover")) }
      </>

      <div className="gear-info">
        <div className="gear-icon"><div className={`icon ${gear.cycle === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getColor(gear.cycle)}}>{utils.getIcon(gear.slot, undefined, undefined, "2.1em", "0em")}</div></div>
        <div className="gear-title" style={{ color: getColor(gear.cycle), fontSize: Math.min(19, 300 / (1.2 * gear.name.length)) }}>
          {gear.name}
        </div>
        <div className="gear-icon"><div className={`icon ${gear.cycle === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getColor(gear.cycle)}}>{utils.getIcon("Gear", undefined, undefined, "2em", "0em")}</div></div>
      </div>

      {/* Stats and Image */}
      <div className="gear-card">
        {false && ( /* Disabling image rendering for now. Will reenable if loading images in becomes easier */
          <div className="gear-image">
            <img src={`./src/assets/images/${gear.cardIDs[0]}.png`} alt={gear.name} />
          </div>
        )}

        {/* Offensive Statistics */}
        <div className="gear-stats-container gear-stats-left">
          {gear.offensiveStatistics.attackDice && (
            <div className="gear-stats">{gear.offensiveStatistics.attackDice} {utils.getIcon("d10", undefined, undefined, "1.5em")}</div>
          )}
          {gear.offensiveStatistics.precision && (
            <div className="gear-stats">{gear.offensiveStatistics.precision}</div>
          )}
          
          {gear.offensiveStatistics.power?.map((p, index) => (
            <div key={index} >
              {p.gate && (
                <div className="gear-stats gate" style={{ background: getGateColor(p.gate.type) }}>
                  <span>{utils.createPowerGate(p.gate.type, p.gate.value)}</span>
                </div>
              )}
              <div className="gear-stats">
                {p.amount} {utils.getIcon(p.type, "Power", undefined, "1.5em")}
              </div>
            </div>
          ))}
        </div>

        {/* Ability Box */}
        <div className="gear-abilities">
          <div>
          {gear.abilities.map((ability, index) => {
            return (
              <>
              {(ability.flavorName || ability.timing) && (<br/>)}
              <span key={index}>
                {` `}
                {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
                {ability.costs && utils.inputIconUpdatedComponent(ability.costs.join(" "))}
                {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
                {ability.flavorName && (<b> {ability.flavorName}: </b>)}
                {ability.type === "unique"
                  ? ( <> {utils.updateComponent(`${ability.name}`)}</>)
                  : ( <> {utils.createTooltip(`${ability.name}`)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</> )
                }
                .
              </span>
              </>
            )
          })}
          </div>
        </div>

        {/* Defensive Statistics */}
        <div className="gear-stats-container gear-stats-right">
          {gear.defensiveStatistics.evasionRerolls && (
            <div className="gear-stats gear-stats-right">{gear.defensiveStatistics.evasionRerolls} {utils.getIcon("EvasionReroll", undefined, undefined, "1.5em")}</div>
          )}
          {gear.defensiveStatistics.evasionBonus && (
            <div className="gear-stats gear-stats-right">{gear.defensiveStatistics.evasionBonus} {utils.getIcon("EvasionBonus", undefined, undefined, "1.5em")}</div>
          )}
          {gear.defensiveStatistics.armorDice && (
            <div className="gear-stats gear-stats-right">{gear.defensiveStatistics.armorDice[0].amount} {utils.getIcon(gear.defensiveStatistics.armorDice[0].type, "Armor", undefined, "1.5em")}</div>
          )}
          {gear.defensiveStatistics.resistances?.map((resistance, index) => (
            <div key={index} className="gear-stats gear-stats-right">{resistance.amount} {utils.getIcon(resistance.type, undefined, undefined, "1.5em")}</div>
          ))}
        </div>
      </div>

      {/* Gated Abilities */}
      <div className="gated-abilities">
        {gear.gatedAbilities.map((ability, index) => {
          const abilityContent = (
            <span key={index}>
              {` `}
              {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
              {ability.costs && utils.inputIconUpdatedComponent(ability.costs.join(" "))}
              {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
              {ability.flavorName && (<b> {ability.flavorName}: </b>)}
              {ability.type === "unique"
                ? ( <> {utils.updateComponent(`${ability.name}`)}</>)
                : ( <> {utils.createTooltip(`${ability.name}`)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</> )
              }
              .
            </span>
          )
          
          return (
            <div key={index} className="gear-info" style={{ background: getGateColor(ability.gate.type) }}>
              <div className="gear-ability-gate">{utils.createAbilityGate(ability.gate.type, ability.gate.value)}</div>
              <div className="gear-gated-ability">{abilityContent}</div>
            </div>
          )
        })}
      </div>

      {/* Gear Info */}
      <div className="gear-subtitle" style={{ background: getColor(gear.cycle), color: getCycleFontColor(gear.cycle) }}>Card Info</div>
      <div className="gear-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="gear-info-header">Acquisition</div>
        <div className="gear-info-detail">{gear.acquisition}</div>
      </div>
      <div className="gear-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="gear-info-header">Traits</div>
        <div className="gear-info-detail" style={{fontStyle: 'italic'}}>{gear.traits.join(", ")}</div>
      </div>
      <div className="gear-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="gear-info-header">Flavor Text</div>
        <div className="gear-info-detail">{gear.flavor}</div>
      </div>
      <div className="gear-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="gear-info-header">ID(s)</div>
        <div className="gear-info-detail">{gear.cardIDs.join(", ")}</div>
      </div>
      <div className="gear-info">
        <div className="gear-info-header">Cycle</div>
        <div className="gear-info-detail">{gear.cycle}</div>
      </div>
    </div>
  );
};

// Helper functions for styling
const getColor = (cycle) => {
  const cycleColors = {
    "Cycle I": "#4A3204",
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

export default GearCard;
