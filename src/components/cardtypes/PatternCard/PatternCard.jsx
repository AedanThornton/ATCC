import React from "react";
import "/src/styles/cardsStyle.css"
import "./PatternCard.css"; // Add corresponding CSS for styling
import utils from "../../utils/index.jsx";
import PatternTable from "./PatternTable.jsx";
import {getGateColor} from "../../../lib/colors.js"

const PatternCard = ({ pattern, index }) => {
  return (
    <div className={`card pattern ${pattern.cardSize.replace(" ", "-").toLowerCase()}`} style={{ color: getColor(pattern.patternType) }}>
      <div className="pattern-title-section">
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
                  {ability.costs && ability.costs.map((cost, index) => <>{utils.getIcon(cost, undefined, index)} </>)}
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
      {pattern.gatedAbilities && pattern.gatedAbilities.length > 0 && (
        <div className="gated-abilities">
          {pattern.gatedAbilities.map((ability, index) => {
            const abilityContent = (
              <span key={index}>
                {` `}
                {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
                {ability.costs && ability.costs.map((cost, index) => <>{utils.getIcon(cost, undefined, index)} </>)}
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
      )}

      {/* Pattern Info */}
      <div>
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
    </div>
  );
};

// Helper functions for styling
const getColor = (type) => {
  return type === "Kratos" ? "#000" : "rgba(92,14,5,1)"
};

export default PatternCard;
