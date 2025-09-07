import React from "react";
import {getGateColor} from "../lib/colors.js"
import utils from "./utils/index.jsx";

const Abilities = ({ abilitiesList }) => {
  return abilitiesList.map((ability, index) => {
    return (
      <React.Fragment key={index}>
        {(ability.flavorName || ability.timing || ability.costs) && (<br/>)}
        <span key={index}>
          {` `}
          {(!ability.timingAfter && ability.timing) && (<b>{utils.getIcon(ability.timing)}: </b>)}
          {ability.costs && ability.costs.map((cost, index) => <>{utils.getIcon(cost, undefined, index)} </>)}
          {(ability.timingAfter && ability.timing) && (<b> {ability.timing}: </b>)}
          {ability.flavorName && (<b> {ability.flavorName}: </b>)}
          {ability.type === "unique"
            ? ( <React.Fragment key={index}> {utils.updateComponent(`${ability.name}`, index)}</React.Fragment>)
            : ( <React.Fragment key={index}> {utils.createTooltip(`${ability.name}`, index)}{ability.y_value ? ` ${ability.y_value}-${ability.x_value}` : (ability.x_value ? ` ${ability.x_value}` : "")}</React.Fragment> )
          }
          .
        </span>
      </React.Fragment>
    )
  })
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