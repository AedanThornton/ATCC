import "/src/styles/cardsStyle.css"
import "./AttackCard.css"; // Add corresponding CSS for styling
import FormattedParagraph from "../../utils/FormattedParagraph.jsx";
import { getCyclePrimaryColor, getCycleSecondaryColor, getGateColor, getCycleTextColor, isAdversary, adversaryPrimaryColor } from "../../../lib/colors.js"
import getIcon from "../../utils/iconUtils.jsx";


const wooIcon = getIcon("WoO", undefined, undefined, "1.3em")

const parseLines = (lines, superindex) => {
  const newLines = []
  let currentBlock = [];
  let startedWithWoO = false

  lines.forEach((line, index) => {
    if (line.WoO) {
      if (currentBlock.length > 0) {
        newLines.push(
          <div key={`${newLines.length}`} style={{ display: "flex" }}>
            {startedWithWoO
              ? (<div style={{ flex: 1 }} className="ai-card__woo-icon">{wooIcon}</div>)
              : (<div style={{ flex: 1 }}></div>)}
            <p style={{ flex: 14 }}>{currentBlock}</p>
          </div>)
        currentBlock = []
      }
      startedWithWoO = true
    }

    currentBlock.push(<FormattedParagraph paragraph={line.effect} />)
  })
  newLines.push(
    <div key={newLines.length} style={{ display: "flex" }}>
      {startedWithWoO && (<div style={{ flex: 1 }} className="ai-card__woo-icon">{wooIcon}</div>)}
      {!startedWithWoO && (<div style={{ flex: 1 }}></div>)}
      <p style={{ flex: 14 }} key={`${newLines.length}`}>{currentBlock}</p>
    </div>)

  return newLines
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
          {/* {attack.usedFor && getIcon(attack.usedFor)} */}
        </div>
        <h2 className="ai-card__name" style={{ fontSize: Math.min(19, 400 / (1.1 * attack.name.length)) }}>{attack.name}</h2>
        <div className="ai-card__stats-bar-right" style={{ color: getCycleTextColor(colorInput) }}>
          <div className="stats-bar-right__level-container" style={{ background: getCyclePrimaryColor(colorInput) }}>
            <div className="stats-bar-right__level">{attack.level}</div>
          </div>
          <div className={`stats-bar-right__dice ${!isAdversary[attack.usedFor] && "invert-icons"}`}>
            <span className="stats-bar-right__dice-value">{attack.dice}</span>
            {getIcon("d10")}
          </div>
          <div className="stats-bar-right__difficulty">{attack.difficulty}+</div>
          <div className="ai-card__stats-background" style={{ background: getCycleSecondaryColor(colorInput) }}></div>
        </div>
      </div>

      <div className="ai-card_main-body">
        {/* Flavor Text */}
        {attack.flavor && <p className="ai-card__flavor">{attack.flavor}.</p>}

        {/* Targeting */}
        <div className="ai-card__targeting">
          <div className="ai-card__action-line">
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
                <span style={{ paddingLeft: `${100 / 15}%` }}></span>
                <span style={{ flex: 14 }}><span style={{ fontWeight: "bold" }}>{line.type}</span> <FormattedParagraph paragraph={line.target} /></span>
              </span>
            )
            )}
          </div>
        </div>

        {/* Action Section */}
        <div className="ai-card__action">
          <div className="ai-card__action-line">
            {/* WoO */}
            <div className="ai-card__woo-icon">{attack.preActionWoO && wooIcon}</div>

            {/* Header */}
            <span className="ai-card__section-header ai-card__section-header--action" style={{ backgroundColor: getCyclePrimaryColor(colorInput), color: getCycleTextColor(colorInput) }}>
              MOVE & {attack.preAction && attack.preAction.toUpperCase() + " & "}{attack.attackType.includes("Judgement") ? "JUDGE" : "ATTACK"}
            </span>

            {/* Banners */}
            {attack.attackBanners?.map((banner, index) => (
              <span key={index} className="ai-card__attack-banner invert-icons" style={{ backgroundColor: getGateColor(banner.gate?.gateType || "danger") }}>
                {getIcon(banner.gate?.gateType, undefined, "icon-" + index)} {banner.gate?.gateValue}: <FormattedParagraph paragraph={banner.effect} />
              </span>
            ))}
          </div>
          <div className={`ai-card__consequences-list ${isAdversary[attack.usedFor] && "invert-icons"}`}>
            {parseLines(attack.consequences, "consequences")}
          </div>
        </div>

        {/* After Attack Section */}
        {attack.afterAttackEffects?.length > 0 && (
          <div className="ai-card__after-attack">
            <div className="ai-card__action-line"> {/* Reuse style for alignment */}
              <div className="ai-card__woo-icon">{attack.preAfterAttackWoO && wooIcon}</div>
              <span className="ai-card__section-header ai-card__section-header--after-attack" style={{ backgroundColor: getCyclePrimaryColor(colorInput), color: getCycleTextColor(colorInput) }}>AFTER {attack.afterFinal && "FINAL"} ATTACK</span>
            </div>
            <div className="ai-card__after-attack-list">
              {parseLines(attack.afterAttackEffects, "afterattack")}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="ai-card__footer" style={{ backgroundColor: isDahaka ? adversaryPrimaryColor : getCycleSecondaryColor(colorInput) }}>
          <span className="ai-card_footer-div ai-card__id" style={{ color: getCycleTextColor(colorInput) }}>{!isDahaka && `ID: ${attack.cardIDs?.[0]}`}</span>
          <span className="ai-card_footer-div ai-card__type-indicator" style={{ color: isDahaka ? "white" : getCycleTextColor(colorInput) }}>
            {getAttackType(attack.attackType, attack.subtype || "AI")}
          </span>
          <div className="ai-card_footer-div"></div>
        </div>
      </div>
    </div>
  );
};

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
