import React, { useState } from "react"
import { getGateColor } from "../../lib/colors"
import FocusCardOverlay from "../FocusCardOverlay"
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
      {inLineGate && sentence.gate && createGate([sentence.gate], [sentence.value], getGateColor(sentence.gate) || "none")}
      {pos > 0 && (sentence.abilityText[0].type === "timing" || sentence.costs) && <br />}
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
  return paragraph?.map((sentence, index) => (
    <React.Fragment key={index}>
      <FormattedSentence sentence={sentence} inLineGate={inLineGate} pos={index} invertIcons={invertIcons}/>
    </React.Fragment>
  ))
}

export const GatedFormattedParagraph = ({ gatedParagraph, inLineGate = false }) => {
  return (
    <div className="gated-abilities">
      {gatedParagraph.map((gatedSentence, index, array) => {
        return inLineGate ?
        <FormattedSentence sentence={gatedSentence} inLineGate={inLineGate} />
        :
        <div key={index} className="gear-gate" style={{ flexDirection: array.length === 1 ? "column" : "row", background:  `linear-gradient(90deg, ${getGateColor(gatedSentence.gate)} 30%, ${getGateColor(gatedSentence.gate2 ? gatedSentence.gate2 : gatedSentence.gate)} 70%)` }}>
          <div className="gear-ability-gate" style={{ paddingLeft: array.length === 1 ? 0 : "18px"}}>
            {createGate(
                [gatedSentence.gate, gatedSentence.gate2 || "", gatedSentence.comboGate || ""],
                [gatedSentence.value, gatedSentence.value2 || ""]
            )}
          </div>
          <div className="gear-gated-ability" style={{ textAlign: array.length === 1 ? "center" : "left"}}>
            <FormattedSentence sentence={gatedSentence} invertIcons={true} />
          </div>
        </div>
      })}
    </div>
  )
}

export default FormattedParagraph