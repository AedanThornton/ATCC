import React, { useState } from "react"
import "./Compare.css"
import { useLocalStorage } from "../../context/LocalStorageContext"
import CardRenderer from "../cards/CardRenderer"

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

function toPercent(num) {
  return Math.round(num * 10000) / 100 + "%"
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function binomial(hitChance, missChance, hitsDesired, totalRolls) {
  const binomialDist = (
    factorial(totalRolls) / (factorial(hitsDesired) * factorial(totalRolls - hitsDesired)) *
    hitChance ** hitsDesired * 
    missChance ** (totalRolls-hitsDesired))
  return binomialDist
}

function calculateHitChance({diceCount, precision, desiredHits, toHitTarget}) {
  const singleDieHitChance = Math.max(Math.min((11 - toHitTarget + precision)/10, 0.9), 0.1)
  const averageHits = diceCount * singleDieHitChance

  if (desiredHits) {
    let hitChance = 0.0
    for (let i = desiredHits; i <= diceCount; i++) {
      hitChance += binomial(singleDieHitChance, 1-singleDieHitChance, i, diceCount)
    }

    return hitChance
  }

  return Math.round(averageHits * 100) / 100
}

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
              {/* remove from compare */}
            </div>

            <div className="compare-panel__card">
              {console.log(cardData.name)}
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