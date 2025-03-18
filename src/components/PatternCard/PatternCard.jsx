import React from "react";
import "./PatternCard.css"; // Add corresponding CSS for styling
import utils from "../utils/index.jsx";

const PatternCard = ({ pattern, index }) => {
  return (
    <div className="pattern mini-american" style={{ color: getColor(pattern.cycle) }}>
      <div className="pattern-info">
        <div className="pattern-icon"><div className={`icon ${pattern.cycle === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getColor(pattern.cycle)}}>{utils.getIcon(pattern.slot, undefined, undefined, "2.1em", "0em")}</div></div>
        <div className="pattern-title" style={{ color: getColor(pattern.cycle), fontSize: Math.min(19, 300 / (1.2 * pattern.name.length)) }}>
          {pattern.name}
        </div>
        <div className="pattern-icon"></div>
      </div>

      {/* Stats and Image */}
      <div className="pattern-card">
        <div className="pattern-table">
            {pattern.kratosTable 
                ? (pattern.kratosTable.map((row, index) => {
                    {/*put kratos table constructor here*/}
                }))
                : (pattern.traumaTable.map((row, index) => {
                    <div className="pattern-row">{row.range}{/*put the threshold symbol here*/}</div> 
                }))
            }
        </div>
      </div>

        {/* Ability Box */}
        <div className="pattern-abilities">
            <div>
            {pattern.abilities.map((ability, index) => {
                const abilityContent = (
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

                return (
                    <div key={index} className="pattern-info" style={{ background: "danger" }}>
                        <div className="pattern-gated-ability">{abilityContent}</div>
                    </div>
                )
            })}
            </div>
        </div>

      {/* Gated Abilities */}
      <div className="gated-abilities">
        {pattern.gatedAbilities.map((ability, index) => {
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
            <div key={index} className="pattern-info" style={{ background: getGateColor(ability.gate.type) }}>
              <div className="pattern-ability-gate">{utils.createAbilityGate(ability.gate.type, ability.gate.value)}</div>
              <div className="pattern-gated-ability">{abilityContent}</div>
            </div>
          )
        })}
      </div>

      {/* Pattern Info */}
      <div className="pattern-subtitle" style={{ background: getColor(pattern.cycle), color: getCycleFontColor(pattern.cycle) }}>Card Info</div>
      <div className="pattern-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="pattern-info-header">Acquisition</div>
        <div className="pattern-info-detail">{pattern.acquisition}</div>
      </div>
      <div className="pattern-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="pattern-info-header">Traits</div>
        <div className="pattern-info-detail" style={{fontStyle: 'italic'}}>{pattern.traumaTable ? "Trauma" : "Kratos"}, {pattern.patternType}</div>
      </div>
      {/* <div className="pattern-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="pattern-info-header">Flavor Text</div>
        <div className="pattern-info-detail">{pattern.flavor}</div>
      </div>*/}
      <div className="pattern-info" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="pattern-info-header">ID(s)</div>
        <div className="pattern-info-detail">{pattern.cardIDs.join(", ")}</div>
      </div>
      <div className="pattern-info">
        <div className="pattern-info-header">Cycle</div>
        <div className="pattern-info-detail">{pattern.cycle}</div>
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

export default PatternCard;
