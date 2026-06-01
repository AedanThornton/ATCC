import { binomial } from "./extraMath.js"

export function checkGateRequirements({gate, stats, hits, maxHits}) {
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

export function getPowerDiceList({hits = 0, maxHits = 0, powerArray = [], currentStats = {}}) {
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

export function calculateHitChance({diceCount, precision, desiredHits, toHitTarget}) {
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