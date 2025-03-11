import React from "react";
import "./GearCard.css"; // Add corresponding CSS for styling
import utils from "../utils/index";

const GearCard = ({ gear }) => {
  return (
    <div className="gear" style={{ color: getColor(gear.cycle) }}>
      <div className="gear-info">
        <div className="gear-icon"><div className={`icon ${gear.cycle === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getColor(gear.cycle)}}>{utils.getIcon(gear.slot, undefined, undefined, "1.8em", "0em")}</div></div>
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
        {gear.offensiveStatistics && (
          <div className="gear-stats-container gear-stats-left">
            {gear.offensiveStatistics.attackDice && (
              <div className="gear-stats">{gear.offensiveStatistics.attackDice} {utils.getIcon("d10")}</div>
            )}
            {gear.offensiveStatistics.precision && (
              <div className="gear-stats">{gear.offensiveStatistics.precision}</div>
            )}
            
            {gear.offensiveStatistics.power?.map((p, index) => (
              <div key={index} >
                {p.gate && (
                  <div className="gear-stats gate" style={{ background: getGateColor(p.gate.type) }}>
                    <span>{utils.inputIconUpdatedComponent(p.gate.type)} / {p.gate.value}</span>
                  </div>
                )}
                <div className="gear-stats">
                  {p.amount} {utils.inputIconUpdatedComponent(p.type, "Power")}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Defensive Statistics */}
        <div className="gear-stats-container gear-stats-right">
          {gear.defensiveStatistics.evasionRerolls && (
            <div className="gear-stats gear-stats-right">{gear.defensiveStatistics.evasionRerolls} {utils.getIcon("EvasionReroll")}</div>
          )}
          {gear.defensiveStatistics.evasionBonus && (
            <div className="gear-stats gear-stats-right">{gear.defensiveStatistics.evasionBonus} {utils.getIcon("EvasionBonus")}</div>
          )}
          {gear.defensiveStatistics.armorDice && (
            <div className="gear-stats gear-stats-right">{gear.defensiveStatistics.armorDice[0].amount} {utils.getIcon(gear.defensiveStatistics.armorDice[0].type, "Armor")}</div>
          )}
          {gear.defensiveStatistics.resistances?.map((resistance, index) => (
            <div key={index} className="gear-stats gear-stats-right">{resistance.amount} {utils.inputIconUpdatedComponent(resistance.type)}</div>
          ))}
        </div>
      </div>

      {/* Ability Box */}
      <div className="gear-abilities">
        {gear.abilities.map((ability, index) => {
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
          
          return ability.gate ? (
            <div key={index} className="gear-info" style={{ background: getGateColor(ability.gate.type) }}>
              <div className="gear-ability-gate">{utils.createAbilityGate(ability.gate.type, ability.gate.value)}</div>
              <div className="gear-gated-ability">{abilityContent}</div>
            </div>
          ) : abilityContent
        })}
      </div>

      {/* Gear Info */}
      <div className="gear-subtitle" style={{ background: getColor(gear.cycle), ...(gear.cycle === "Cycle IV" && { color: "#E7CC68" }) }}>Card Info</div>
      <div className="gear-info">
        <div className="gear-info-header">Traits</div>
        <div className="gear-info-detail" style={{fontStyle: 'italic'}}>{gear.traits.join(", ")}</div>
      </div>
      <div className="gear-info">
        <div className="gear-info-header">Flavor Text</div>
        <div className="gear-info-detail">{gear.flavor}</div>
      </div>
      <div className="gear-info">
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
    "Cycle II": "#492622",
    "Cycle III": "#543560",
    "Cycle IV": "#131004",
    "Cycle V": "#05233B",
    "Mnestis Theatre": "#C59A18",
    "Mnestis": "#C59A18",
  };
  return cycleColors[cycle] || "#FFFFFF";
};

const getGateColor = (gatetype) => {
  gatetype = gatetype.toLowerCase()
  const gateColors = {
    danger: "#9B2315",
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
