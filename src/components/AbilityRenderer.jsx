import React from "react";
import {getGateColor} from "../lib/colors.js"
import utils from "./utils/index.jsx";

const Abilities = ({ abilitiesList }) => {
  return abilitiesList.map((ability, index) => (
    <React.Fragment key={index}>
      {(ability.flavorName || ability.timing || ability.costs) && index !== 0 && (<br/>)}
      <span>
        {` `}
        {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
        {ability.costs && ability.costs.map((cost, index) => <React.Fragment key={index}>{utils.getIcon(cost, undefined, index)} </React.Fragment>)}
        {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
        {ability.flavorName && (<b> {ability.flavorName}: </b>)}
        {ability.type === "unique"
          ? ( <> {utils.updateComponent(`${ability.name}`, index)}</>)
          : ( <> {utils.createTooltip(`${ability.name}`, index)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</> )
        }
        .
      </span>
    </React.Fragment>
  ))
}

const GatedAbilities = ({ gatedAbilitiesList }) => {
  return (
  <div className="gated-abilities">
    {gatedAbilitiesList.map((gateGroup, index) => (
      <div key={index} className="card-info" style={{ background: getGateColor(gateGroup.gate) }}>
        <div className="gear-ability-gate">{utils.createAbilityGate(gateGroup.gate, gateGroup.value)}</div>
        <div className="gear-gated-ability">
          <Abilities abilitiesList={gateGroup.abilities}/>
        </div>
      </div>
    ))}
  </div>)
}

export { Abilities, GatedAbilities }