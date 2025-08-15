import React from "react";
import "/src/styles/cardsStyle.css"
import "./PatternCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import PatternTable from "./PatternTable.jsx";

const PatternCard = ({ pattern, index }) => {
  return (
    <div className={`pattern ${pattern.cardSize.replace(" ", "-").toLowerCase()} card`} style={{ color: getColor(pattern.patternType) }}>
      <div className="card-info" style={{minHeight: "30px"}}>
        <div className="title-icon"><div className={`icon ${pattern.cycle === "Cycle IV" ? "cycle4" : ""}`} style={{ background: getColor(pattern.patternType)}}>{utils.getIcon(pattern.slot, undefined, undefined, "2.1em", "0em")}</div></div>
          <div className="pattern-title" style={{ color: getColor(pattern.patternType), fontSize: Math.min(19, 300 / (1.2 * pattern.name.length)) }}>
            {pattern.name}
          </div>
        <div className="title-icon"></div>
      </div>

      <div className="pattern-card">
        <PatternTable 
          table={pattern.patternType === "Kratos" ? pattern.kratosTable : pattern.traumaTable} 
          type={pattern.patternType}
        />
      </div>

        {/* Ability Box */}
        <div className="pattern-abilities">
            <div>
            {pattern.abilities.map((ability, index) => {
                const abilityContent = (
                <>
                  {(ability.flavorName || ability.timing) && (<br/>)}
                  <span>
                    {` `}
                    {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
                    {ability.costs && utils.inputIconUpdatedComponent(ability.costs.join(" "))}
                    {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
                    {ability.flavorName && (<b> {ability.flavorName}: </b>)}
                    {ability.type === "unique"
                        ? ( <> {utils.updateComponent(`${ability.name}`, index)}</>)
                        : ( <> {utils.createTooltip(`${ability.name}`, index)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</> )
                    }
                    .
                  </span>
                </>
            )

                return (
                    <div key={index} className="card-info" style={{ background: getGateColor("danger"), padding: "2px 0", color: "white" }}>
                        {abilityContent}
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
            <div key={index} className="card-info" style={{ background: getGateColor(ability.gate.type) }}>
              <div className="pattern-ability-gate">{utils.createAbilityGate(ability.gate.type, ability.gate.value)}</div>
              <div className="pattern-gated-ability">{abilityContent}</div>
            </div>
          )
        })}
      </div>

      {/* Pattern Info */}
      <div className="pattern-subtitle" style={{ background: getColor(pattern.patternType) }}>Card Info</div>
      <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="card-info-header">Traits</div>
        <div className="card-info-detail" style={{fontStyle: 'italic'}}>{pattern.patternType}, {pattern.patternTrait}</div>
      </div>
      {/* <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="card-info-header">Flavor Text</div>
        <div className="card-info-detail">{pattern.flavor}</div>
      </div>*/}
      <div className="card-info centered" style={{lineHeight: "14px", marginBottom: "4px"}}>
        <div className="card-info-header">ID(s)</div>
        <div className="card-info-detail">{pattern.cardIDs.join(", ")}</div>
      </div>
      <div className="card-info centered">
        <div className="card-info-header">Cycle</div>
        <div className="card-info-detail">{pattern.cycle}</div>
      </div>
    </div>
  );
};

// Helper functions for styling
const getColor = (type) => {
  return type === "Kratos" ? "#000" : "rgba(92,14,5,1)"
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
