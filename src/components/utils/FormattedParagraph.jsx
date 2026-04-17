import React, { useState } from "react"
import { getGateColor } from "../../lib/colors"
import FocusCardFetch from "../focuscard/FocusCardFetch"
import createTooltip from "./tooltipsUtil"
import getIcon from "./iconUtils"
import { createGate } from "./gateUtils"

export const FormattedSentence = ({ sentence, inLineGate = false, pos = 0, invertIcons = false }) => {
  if (typeof sentence === "string") {
    console.log("!!!Formatted text had a string input!!!", sentence)
    return sentence
  }

  if (!sentence.abilityText) {
    console.log(`Error: Invalid formatting object.`)
    console.log(sentence);

  }

  const isReaction = sentence.abilityText[0].type === "timing" && sentence.abilityText[0].value === "Reaction"

  function formatText(textClump) {
    switch (textClump.type) {
      case "newline":
        return (<br />)
      case "keyword":
        return createTooltip(textClump.value)
      case "timing":
        if (isReaction) return
        return <b>{textClump.value}:</b>
      case "bold":
        return <b>{textClump.value}</b>
      case "italics":
        return <i>{textClump.value}</i>
      case "icon":
        return getIcon({ name: textClump.value, invert: invertIcons })
      case "cardRef":
        return textClump.refID
          ? <FocusCardFetch cardID={textClump.refID}>
            {textClump.value}
          </FocusCardFetch>
          : <>{textClump.value}</>
      default:
        return textClump.value
    }
  }

  return (
    <>
      {pos > 0 && (sentence.abilityText[0].type === "timing" || sentence.costs || (inLineGate && sentence.gate)) && <br />}
      {inLineGate && sentence.gate && createGate([sentence.gate], [sentence.value], getGateColor(sentence.gate) || "none")}
      <span className="ability-costs">
        {isReaction && getIcon({ name: "Reaction", invert: invertIcons })}
        {sentence.costs?.map((cost, i) => getIcon({ name: cost, index: i, invert: invertIcons }))}
      </span>
      {sentence.abilityText?.map((textClump, index2, array) => (
        <React.Fragment key={index2}>
          {formatText(textClump)}
        </React.Fragment>
      ))}{". "}
    </>
  )
}

const FormattedParagraph = ({ paragraph, inLineGate = false, invertIcons }) => {
  return paragraph?.map((sentence, index) => {
    return <React.Fragment key={index}>
      <FormattedSentence sentence={sentence} invertIcons={invertIcons} pos={index} inLineGate={inLineGate} />
    </React.Fragment>
  })
}

export const GatedAbilities = ({ gateGroups }) => {
  return gateGroups?.map((gateGroup, index, array) => {
    //Only use if there's 1 gate && there are fewer than 6 render components && there are fewer than 16 characters
    //This can almost certainly be improved
    const useOverheadGate =  array.length === 1 && (gateGroup.comboGate === "OR" || gateGroup.abilities[0].abilityText.length > 5 || gateGroup.abilities[0].abilityText[0].value.length > 15)
    
    return <div key={index} className="gear-gate" style={{ flexDirection: useOverheadGate ? "column" : "row", background: `linear-gradient(90deg, ${getGateColor(gateGroup.gate)} 30%, ${getGateColor(gateGroup.gate2 ? gateGroup.gate2 : gateGroup.gate)} 70%)` }}>
      <div className="gear-ability-gate" style={{ paddingLeft: useOverheadGate ? 0 : "18px" }}>
        {createGate(
          [gateGroup.gate, gateGroup.gate2 || "", gateGroup.comboGate || ""],
          [gateGroup.value, gateGroup.value2 || ""]
        )}
      </div>
      <div className="gear-gated-ability" style={{ textAlign: useOverheadGate ? "center" : "left" }}>
        <FormattedParagraph paragraph={gateGroup.abilities} invertIcons={true} />
      </div>
    </div>
  })
}

export default FormattedParagraph