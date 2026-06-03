import React, { useState } from "react"
import "./Compare.css"
import { useLocalStorage } from "../../context/LocalStorageContext"
import CardRenderer from "../cards/CardRenderer"
import { toPercent } from "../../lib/extraMath.js"
import { getPowerDiceList, calculateHitChance } from "../../lib/gearEvalution.js"

const Compare = ({}) => {
  const { appState, cardCache } = useLocalStorage()
  const [cards, setCards] = useState([...appState.savedSets["some Gear set 1 asda"]])
  const inputArgs = {
    toHitTarget: 10,
    tokens: {
      breaks: 0,
      openings: 0,
      blacks: 0,
      fires: 0,
      hopes: 0,
      closings: 0
    },
    stats: {
      Danger: 0,
      Fate: 0,
      Rage: 0,
      Conditions: [""],
    },
    titan: ""
  }
  const compareRows = {
    "Power Level": card => card.cycle,
    "Power Tier": card => card.tier,
    "Dice": card => parseInt(card.offensiveStatistics.attackDice),
    "Precision": card => card.offensiveStatistics.precision,
    "Max Dice": card => {
      const maxHits = parseInt(card.offensiveStatistics.attackDice)
      const diceList = getPowerDiceList({ hits: maxHits, maxHits: maxHits, powerArray: card.offensiveStatistics.power, currentStats: inputArgs.stats})
      return Object.keys(diceList).map(type => `${diceList[type]} ${type}`).join(", ")
    },
    "Average Hits": card => calculateHitChance({ 
      diceCount: parseInt(card.offensiveStatistics.attackDice), 
      precision: parseInt(card.offensiveStatistics.precision),
      toHitTarget: inputArgs.toHitTarget
    }),
    "Chance to Hit": card => toPercent(calculateHitChance({ 
      diceCount: parseInt(card.offensiveStatistics.attackDice), 
      precision: parseInt(card.offensiveStatistics.precision),
      desiredHits: 1,
      toHitTarget: inputArgs.toHitTarget
    })),
    "Chance to Full Hit": card => toPercent(calculateHitChance({ 
      diceCount: parseInt(card.offensiveStatistics.attackDice), 
      precision: parseInt(card.offensiveStatistics.precision),
      desiredHits: parseInt(card.offensiveStatistics.attackDice),
      toHitTarget: inputArgs.toHitTarget
    })),
    "Chance to Full Miss": card => toPercent(1 - calculateHitChance({ 
      diceCount: parseInt(card.offensiveStatistics.attackDice), 
      precision: parseInt(card.offensiveStatistics.precision),
      desiredHits: 1,
      toHitTarget: inputArgs.toHitTarget
    })),
    "Chance to Wound": card => card.cycle,
    "Chance to Fail": card => card.cycle,
  }

  return (
    <div className="compare">

      <div className="compare-labels">
        <div className="compare-panel__controls"></div>{/* controls placeholder */}
        <div className="compare-panel__card"><div className="mini-american" style={{width: 0}}></div></div>{/* card placeholder */}
        {Object.keys(compareRows).map((rowName, i) => (
          <div key={i} className="compare-panel__details compare-labels-item">
            {rowName}
          </div>
        ))}
        <div className="compare-panel__spacer"></div>
      </div>

      <div className="compare-panels">
        {cards.map((card, i) => {
          const cardData = cardCache.get(card)
          if (!cardData) return <React.Fragment key={i}></React.Fragment>

          return <div key={i} className="compare-panel">

            <div className="compare-panel__controls">
              {/* rearrange */}
              {/* editable name field to swap with different card */}
              {/* remove from compare */}
            </div>

            <div className="compare-panel__card">
              <CardRenderer cardData={cardData} variant="backpack" />
            </div>

            {Object.keys(compareRows).map((rowName, i) => (
              <div className="compare-panel__details">
                {(compareRows[rowName](cardData) === 0 || compareRows[rowName](cardData)) ? compareRows[rowName](cardData) : "-"}
              </div>
            ))}

            <div className="compare-panel__spacer"></div>
          </div>
        })}
      </div>

    </div>
  )
}

export default Compare