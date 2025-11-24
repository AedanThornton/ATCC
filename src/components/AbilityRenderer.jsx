import React from "react";
import {getGateColor} from "../lib/colors.js"
import utils from "./utils/index.jsx";

function formatText(textClump) {
  switch(textClump.type) {
    case "keyword":
      return utils.createTooltip(textClump.value)
    case "timing":
      return <><br /><b>{textClump.value}</b>:</>
    case "bold":
      return <b>{textClump.value}</b>
    case "italics":
      return <i>{textClump.value}</i>
    case "icon":
      return utils.getIcon(textClump.value)
    default:
      return textClump.value
  }
}

const Abilities = ({ abilitiesList }) => {
  return abilitiesList?.map((ability, index) => (
    <React.Fragment key={index}>
      {ability.abilityText.map((textClump, index2, array) => (
        <React.Fragment key={index2}>
          {formatText(textClump)}{index2 !== array.length -1 && " "}
        </React.Fragment>
      ))}{". "}
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
            {gateGroup.abilityText.map((textClump, index2, array) => (
              <React.Fragment key={index2}>
                {formatText(textClump)}{index2 !== array.length -1 && " "}
              </React.Fragment>
            ))}{". "}
          </div>
        </div>
      ))}
    </div>
  )
}

export { Abilities, GatedAbilities }