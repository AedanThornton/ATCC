import React, { useState } from "react"
import utils from "./utils"
import { getGateColor } from "../lib/colors"
import FocusCardOverlay from "./FocusCardOverlay"

export const FormattedSentence = ({ sentence, inLineGate = false, pos = 0 }) => {
  if (typeof sentence === "string") {
    console.log("!!!Formatted text had a string input!!!", sentence)
    return sentence
  }

  const isReaction = sentence.abilityText[0].type === "timing" && sentence.abilityText[0].value === "Reaction"

  function formatText(textClump) {
    switch(textClump.type) {
      case "newline":
        return (<br />)
      case "keyword":
        return utils.createTooltip(textClump.value)
      case "timing":
        if (isReaction) return
        return <><b>{textClump.value}:</b></>
      case "bold":
        return <b>{textClump.value}</b>
      case "italics":
        return <i>{textClump.value}</i>
      case "icon":
        return utils.getIcon(textClump.value)
      case "cardRef":
        return textClump.refID
          ? <FocusCardOverlay cardID={textClump.refID}>
              {textClump.value}
            </FocusCardOverlay>
          : <>{textClump.value}</>
      default:
        return textClump.value
    }
  }

  return (
    <>
      {inLineGate && sentence.gate && utils.createAbilityGate(sentence.gate, sentence.value, getGateColor(sentence.gate) || "none")}
      {pos > 0 && (sentence.abilityText[0].type === "timing" || sentence.costs) && <br />}
      <span className="ability-costs">
        {isReaction && (<>{utils.getIcon("Reaction")}</>)}
        {sentence.costs?.map((cost, i) => (
          <>{utils.getIcon(cost, undefined, i)}</>
        ))}
      </span>
      {sentence.abilityText?.map((textClump, index2, array) => (
        <React.Fragment key={index2}>
          {formatText(textClump)}{index2 !== array.length -1 && " "}
        </React.Fragment>
      ))}{". "}
    </>
  )
}

const FormattedParagraph = ({ paragraph, inLineGate = false }) => {
  return paragraph?.map((sentence, index) => (
    <React.Fragment key={index}>
      <FormattedSentence sentence={sentence} inLineGate={inLineGate} pos={index}/>
    </React.Fragment>
  ))
}

export const GatedFormattedParagraph = ({ gatedParagraph }) => {
  return (
    <div className="gated-abilities">
      {gatedParagraph.map((gatedSentence, index) => {
        return <div key={index} className="card-info" style={{ background: getGateColor(gatedSentence.gate) }}>
          <div className="gear-ability-gate">{utils.createAbilityGate(gatedSentence.gate, gatedSentence.value)}</div>
          <div className="gear-gated-ability">
            <FormattedSentence sentence={gatedSentence}/>
          </div>
        </div>
      })}
    </div>
  )
}

export default FormattedParagraph