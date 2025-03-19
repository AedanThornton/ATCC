import React from "react";
import "./PatternCard.css"; // Add corresponding CSS for styling
import utils from "../utils/index.jsx";

const PatternCard = ({ pattern, index }) => {
  return (
    <div className="pattern mini-american" style={{ color: getColor(pattern) }}>
      <div className="pattern-info">
        <div className="pattern-icon"><div className={`icon ${pattern.cycle === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getColor(pattern)}}>{utils.getIcon(pattern.slot, undefined, undefined, "2.1em", "0em")}</div></div>
        <div className="pattern-title" style={{ color: getColor(pattern), fontSize: Math.min(19, 300 / (1.2 * pattern.name.length)) }}>
          {pattern.name}
        </div>
        <div className="pattern-icon"></div>
      </div>

      {/* Stats and Image */}
      <div className="pattern-card">
        <div className="pattern-table">
          {pattern.kratosTable.length > 0
            ? pattern.kratosTable.map((row, index) => (
              <div className="kratos-full-row">
                <div className="kratos-rage-box"><div className="kratos-rage-number">{index}</div></div>
                <div key={index} className="kratos-row">
                  {row.map((option, index) =>
                    <div key={index} className="kratos-option">
                        {option[0].x_value && `${option[0].x_value} `}{utils.getIcon(option[0].name, "Power", undefined, "1.3em")}
                        {option[1]?.name && (<>{option[1].x_value && `${option[1].x_value} `}{option[1].name}</>)}
                        {option[2]?.name && (<>{option[2].x_value && `${option[2].x_value} `}{option[2].name}</>)}
                    </div>
                  )}
                </div>
                <div className="kratos-rage-box"><div className="kratos-rage-number">{index}</div></div>
              </div>
            ))
            : pattern.traumaTable.map((row, index) => (
              <div className="trauma-row">{row.range}{/*put the threshold symbol here*/}</div> 
            ))
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
                    <div key={index} className="pattern-info" style={{ background: getGateColor("danger"), padding: "2px 0" }}>
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
      <div className="pattern-subtitle" style={{ background: getColor(pattern) }}>Card Info</div>
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
const getColor = (pattern) => {
  return pattern.kratosTable.length > 0 ? "#000" : "rgba(92,14,5,1)"
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
