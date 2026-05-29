import React, { useState } from "react"
import "./Compare.css"
import { useLocalStorage } from "../../context/LocalStorageContext"
import CardRenderer from "../cards/CardRenderer"

const exampleStats = {
  "Danger": 9,
  "Fate": 0,
  "Rage": 0,
  "Conditions": [""],
}

function checkGateRequirements({gate, stats, hits, maxHits}) {
  switch (gate.type.toLowerCase()) {
    case "full hit":
      return hits === maxHits
    case "hits":
      if (gate.value.includes("+")) return hits >= parseInt(gate.value[0])
      else return hits === parseInt(gate.value)
    default:
      if (gate.value) return stats[gate.type] >= parseInt(gate.value[0]) //normal stat gates
      else return stats["Conditions"].includes(gate.type) //condition card gates
  }
}

function getPowerDiceList({hits = 0, maxHits = 0, powerArray = [], currentStats = {}}) {
  let output = {
    "Red": 0,
    "Black": 0,
    "White": 0,
    "Mortal": 0,
    "Power": 0,
  }

  powerArray.map(powerGroup => {
    if (!powerGroup.plus) {
      if (!powerGroup.gate) {
        powerGroup.type.map(die => output[die] += hits)
      } else {
        if (checkGateRequirements({gate: powerGroup.gate, stats: currentStats, hits: hits, maxHits: maxHits})) {
          output = {
            "Red": 0,
            "Black": 0,
            "White": 0,
            "Mortal": 0,
            "Power": 0,
          }
          powerGroup.type.map(die => output[die] += (powerGroup.gate.type === "Hits" ? 1 : hits))
          console.log(output)
        }
      }
    } else {
      if (!powerGroup.gate) {
        powerGroup.type.map(die => output[die] += 1)
      } else {
        if (checkGateRequirements({gate: powerGroup.gate, stats: currentStats, hits: hits, maxHits: maxHits})) {
          powerGroup.type.map(die => output[die] += 1)
        }
      }
    }
  })

  Object.keys(output).map(type => output[type] === 0 && delete output[type])

  return output || null
}

const Compare = ({}) => {
  const { appState, cardCache } = useLocalStorage()
  const [cards, setCards] = useState([...appState.savedSets["some Gear set 1 asda"]])
  const compareRows = {
    "Power Level": card => card.cycle,
    "Power Tier": card => card.tier,
    "Dice": card => card.offensiveStatistics.attackDice,
    "Precision": card => card.offensiveStatistics.precision,
    "Max Dice": card => {
      const maxHits = parseInt(card.offensiveStatistics.attackDice)
      const diceList = getPowerDiceList({ hits: maxHits, maxHits: maxHits, powerArray: card.offensiveStatistics.power, currentStats: exampleStats})
      return Object.keys(diceList).map(type => `${diceList[type]} ${type}`).join(", ")
    },
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
              {/* remove from compare */}
            </div>

            <div className="compare-panel__card">
              <CardRenderer cardData={cardData} variant="backpack" />
            </div>

            {Object.keys(compareRows).map((rowName, i) => (
              <div className="compare-panel__details">
                {compareRows[rowName](cardData) ? compareRows[rowName](cardData) : "-"}
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