import React from "react";
import "/src/styles/cardsStyle.css"
import "./AttackCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import { getCyclePrimaryColor, getCycleSecondaryColor, getGateColor, getCycleTextColor, isAdversary, adversaryPrimaryColor } from "../../../lib/colors.js"
import getIcon from "../../utils/iconUtils.jsx";


const wooIcon = getIcon({name: "WoO", size: "1.3em"})
const marginConstant = 15

const parseLines = (lines, isAdversary, colorInput) => {
  const newLines = []
  let currentBlock = [];
  let startedWithWoO = false

  lines.forEach((line, index) => {
    if (line.WoO) {
      if (currentBlock.length > 0) {
        newLines.push(
          <div key={`${newLines.length}`} style={{ display: "flex" }}>
            <div style={{ flex: 1, width: `${100 / marginConstant}%` }} className="ai-card__woo-icon">{startedWithWoO && wooIcon}</div>
            <p style={{ flex: 14 }}>{currentBlock}</p>
          </div>)
        currentBlock = []
      }
      startedWithWoO = true
    }

    const newBlock = line.banner
      ? <><Banner banner={line} isAdversary={isAdversary} colorInput={colorInput} /><br /></>
      : <FormattedParagraph paragraph={line.effect} invertIcons={isAdversary}/>
    currentBlock.push(newBlock)
  })
  newLines.push(
    <div key={newLines.length} style={{ display: "flex" }}>
      {startedWithWoO && (<div style={{ flex: 1, width: `${100 / marginConstant}%` }} className="ai-card__woo-icon">{wooIcon}</div>)}
      {!startedWithWoO && (<div style={{ flex: 1 }}></div>)}
      <p style={{ flex: marginConstant - 2 }} key={`${newLines.length}`}>{currentBlock}</p>
      <div style={{ flex: 1, width: `${100 / marginConstant}%` }}></div>
    </div>)

  return newLines
}

const Banner = ({ banner, isAdversary, colorInput }) => {
  return (
    <span
      className={`ai-card__section-header`}
      style={{ backgroundColor: getCycleSecondaryColor(colorInput), color: isAdversary ? "black" : "white" }}
    >
      <FormattedParagraph paragraph={banner.effect} invertIcons={!isAdversary} />
    </span>
  )
}

const AttackDiagram = ({diagram, isAdversary}) => {
  let primordialAdded = false
  const attackDiagram = diagram?.map((row, i) => {
    let span = 0
    let output = []

    row.split("").map((char, j) => {
      if (char === "P") {
        if (primordialAdded) return;

        span += 1
        return
      }

      if (span > 1 && char !== "P") {
        primordialAdded = true;

        output.push(
          <div
            key={`${i}-${j}-p`}
            className={`ai-card__zone-diagram__space zone-type-P`}
            style={{
              gridRow: `span ${span}`,
              gridColumn: `span ${span}`,
            }}
          >
            {getIcon({name: "PrimordialZoneMarker", size: "1.2em"})}
          </div>
        )

        span = 0;
      }

      output.push(
        <div
          key={`${i}-${j}`}
          className={`ai-card__zone-diagram__space zone-type-${char}`}
        >
          {char === "T" && getIcon({name: "PriorityTarget", size: "0.6em"})}
        </div>
      )
    })

    return output
  });  

  return <div 
    className="ai-card__zone-diagram"
    style={{filter: isAdversary && "invert(1)"}}
  >
    {attackDiagram.map((cell, i) => (
      <React.Fragment key={i}>
        {cell}
      </React.Fragment>
    ))}
  </div>
}

const AttackCard = ({ attack, index, isDahaka = false }) => {
  const colorInput = isAdversary[attack.usedFor] ? "Adversary" : attack.cycle

  return (
    <div key={index}
      className={`card ai-card ${attack.cardSize.replace(" ", "-").toLowerCase()}`}
      style={{
        color: getCyclePrimaryColor(colorInput),
        backgroundColor: isAdversary[attack.usedFor] && adversaryPrimaryColor,
        borderBottomLeftRadius: isDahaka && 0,
        borderBottomRightRadius: isDahaka && 0,
      }}
    >
      {/* Header */}
      <div className="ai-card__header">
        <div className="ai-card__icon-top-left" style={{ background: getCyclePrimaryColor(colorInput), color: getCycleSecondaryColor(colorInput) }}>
          {/* {attack.usedFor && getIcon({name: attack.usedFor})} */}
        </div>
        <h2 className="ai-card__name" style={{ fontSize: Math.min(19, 400 / (1.1 * attack.name.length)) }}>{attack.name}</h2>
        <div className="ai-card__stats-bar-right" style={{ color: isAdversary[attack.usedFor] ? "black" : "white" }}>
          <div
            className="stats-bar-right__level-container"
            style={{
              background: isDahaka ? adversaryPrimaryColor : getCyclePrimaryColor(colorInput),
              borderColor: isDahaka ? "white" : getCycleTextColor(colorInput),
              color: isDahaka && "white"
            }}
          >
            <div className="stats-bar-right__level">{attack.level}</div>
          </div>
          {attack.dice && <><div className={`stats-bar-right__dice`}>
            <span className="stats-bar-right__dice-value">{attack.dice}</span>
            {getIcon({name: "d10", invert: !isAdversary[attack.usedFor]})}
          </div>
            <div className="stats-bar-right__difficulty">{attack.difficulty}+</div>
            <div className="ai-card__stats-background" style={{ background: getCycleSecondaryColor(colorInput) }}></div></>}
        </div>
      </div>

      <div>
        <div className="ai-card__main-body">
          {/* Flavor Text */}
          {attack.flavor && <span className="ai-card__flavor"><FormattedParagraph paragraph={attack.flavor} /></span>}

          {attack.preTarget && <div>{parseLines(attack.preTarget, !!isAdversary[attack.usedFor], colorInput)}</div>}

          {/* Targeting */}
          <div className="ai-card_section">
            <div className="ai-card__action-line" style={{ marginRight: `${100 / marginConstant}%` }}>
              <span style={{ width: "6.66%" }}></span>
              <span
                className="ai-card__section-header ai-card__section-header--target"
                style={{
                  backgroundColor: getCyclePrimaryColor(colorInput),
                  color: getCycleTextColor(colorInput)
                }}>
                TARGET
              </span>
            </div>
            <div className="ai-card__targeting-list">
              {attack.targeting?.map((line, index) => (
                <span key={index} style={{ display: "flex" }}>
                  <span style={{ paddingLeft: `${100 / marginConstant}%` }}></span>
                  <span style={{ flex: marginConstant - 1 }}><span style={{ fontWeight: "bold" }}>{line.type}</span> <FormattedParagraph paragraph={line.target} invertIcons={isAdversary[attack.usedFor]} /></span>
                </span>
              )
              )}
            </div>
          </div>

          {attack.preAction && <div className="ai-card__pre-action-effects">{parseLines(attack.preAction, !!isAdversary[attack.usedFor], colorInput)}</div>}

          {/* Action Section */}
          <div className="ai-card_section">
            <div className="ai-card__action-line" style={{ marginRight: `${100 / marginConstant}%` }}>
              {/* WoO */}
              <div className="ai-card__woo-icon" style={{ width: `${100 / marginConstant}%` }}>{attack.preActionWoO && wooIcon}</div>

              <div>
                {/* Header */}
                <span className="ai-card__section-header ai-card__section-header--action" style={{ backgroundColor: getCyclePrimaryColor(colorInput), color: getCycleTextColor(colorInput) }}>
                  {attack.moveType === "None" ? "" : getMoveType(attack.moveType, attack.moveLocation || "") + " & "}{attack.preAttack && attack.preAttack.toUpperCase() + " & "}{attack.attackType.includes("Judgement") ? "JUDGE" : "ATTACK"}
                </span>

                {/* Banners */}
                {attack.attackBanners?.map((banner, index) => (
                  <Banner key={index} banner={banner} isAdversary={isAdversary[attack.usedFor]} colorInput={colorInput} />
                ))}
              </div>
            </div>

            {attack.attackDiagram && <AttackDiagram diagram={attack.attackDiagram} isAdversary={isAdversary[attack.usedFor]}/>}

            <div className={`ai-card__consequences-list`}>
              {parseLines(attack.consequences, !!isAdversary[attack.usedFor], colorInput)}
            </div>
          </div>

          {/* After Attack Section */}
          {attack.afterAttackEffects?.length > 0 && (
            <div className="ai-card_section">
              <div className="ai-card__action-line" style={{ marginRight: `${100 / marginConstant}%` }}>
                <div className="ai-card__woo-icon" style={{ width: `${100 / marginConstant}%` }}>{attack.preAfterAttackWoO && wooIcon}</div>
                <span className="ai-card__section-header ai-card__section-header--after-attack" style={{ backgroundColor: getCyclePrimaryColor(colorInput), color: getCycleTextColor(colorInput) }}>AFTER {attack.afterFinal && "FINAL"} ATTACK</span>
              </div>
              <div className="ai-card__after-attack-list">
                {parseLines(attack.afterAttackEffects, !!isAdversary[attack.usedFor], colorInput)}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="ai-card__footer" style={{ backgroundColor: isDahaka ? adversaryPrimaryColor : getCyclePrimaryColor(colorInput) }}>
          <span className="ai-card_footer-div ai-card__id" style={{ color: getCycleTextColor(colorInput) }}>{!isDahaka && `ID: ${attack.cardIDs?.[0]}`}</span>
          <span className="ai-card_footer-div ai-card__type-indicator" style={{ color: isDahaka ? "white" : getCycleTextColor(colorInput) }}>
            {attack.cycle.includes("Mnestis") && "MNESTIS "}{getAttackType(attack.attackType, attack.subtype || "AI")}
          </span>
          <div className="ai-card_footer-div"></div>
        </div>

      </div>
    </div>
  );
};

const getMoveType = (moveType, location = "") => {
  if (moveType === "Move to LOCATION") {
    return "MOVE TO " + location.toUpperCase()
  } else {
    return moveType.toUpperCase()
  }
}

const getAttackType = (attackType, subtype) => {
  if (subtype !== "AI") return subtype.toUpperCase()

  const typeList = [
    "Judgement", "Wish", "Sequential", "Simultaneous", "Regular"
  ]

  const priType = attackType.includes("Judgement") ? "JUDGEMENT" : "ATTACK"
  const isWish = attackType.includes("Wish") ? "WISH" : ""
  const secType = attackType.filter(type => !typeList.includes(type)).join(" ").toUpperCase()
  const terType =
    attackType.includes("Sequential") ? "SEQUENTIAL" :
      attackType.includes("Simultaneous") ? "SIMULTANEOUS" : ""


  return `${terType && terType + " "}${secType && secType + " "}${isWish && isWish + " "}${priType}`
}

export default AttackCard;
