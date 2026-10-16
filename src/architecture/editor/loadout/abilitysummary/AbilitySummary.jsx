// A menu that shows a summary of the available abilities among all cards in the Active Loadout
// (Optionally) takes in triskelion stateful variables to use for stat gates. This will likely be tied to the Active Loadout
// Takes in the state of all cards in the Active Loadout (exhausted, discard, etc.)

// Grabs all of the functional abilities
// Picks out the weapons, and has a menu to select the active weapon
// Sorts abilities by timing window, and groups them if stackable, ignoring all abilities on non-active weapons
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../../management/localstorage/LocalStorageContext"
import FormattedParagraph from "../../../../components/utils/abilitytools/FormattedParagraph";
import createTooltip from "../../../../components/utils/abilitytools/tooltipsUtil";
import "./abilitysummary.css"
import getIcon from "../../../../components/utils/iconUtils";
import { createGate } from "../../../../components/utils/abilitytools/gateUtils";
import { getGateColor } from "../../../../lib/colors";

function activateAbility(ability, loadoutState, triskelionState) {
  ability.cost.split(" ").map(cost => {
    console.log(cost, loadoutState, triskelionState)
    if (cost === "Exhaust") loadoutState?.setState(ability.slot, "exhausted", true)
    if (cost === "Discard") loadoutState?.setState(ability.slot, "discarded", true)
    if (cost === "Rage" || cost === "Fate" || cost === "Danger") triskelionState?.plusStat(cost)
  })
}

function checkGateIsOpen(gate, triskelionState) {
  const gateType = gate.split(" ")[0]
  const gateValue = gate.split(" ")[1]

  if (gateType === "Rage" || gateType === "Fate" || gateType === "Danger") {
    const gateNum = parseInt(gateValue[0])
    const gateSign = gateValue[1]

    if ((gateSign === "+" && triskelionState[gateType.toLowerCase()] >= gateNum) || (gateSign === "-" && triskelionState[gateType.toLowerCase()] <= gateNum)) {
      return true
    } else {
      return false
    }
  }

  return false
}

function AbilityLine({ability, filters, loadoutState, triskelionState, index}) {
  const exhausted = loadoutState.slotStates[ability.slot].exhausted
  const discarded = loadoutState.slotStates[ability.slot].discarded
  const inactive = exhausted || discarded
  const slotHovered = loadoutState.slotStates[ability.slot].highlighted
  const gateOpen = ability.gate
    ? checkGateIsOpen(ability.gate, triskelionState)
    : true

  let effect = ability.effect
  if (ability.keyword) {
    const endcap = effect.split(" ").pop()
    let newendcap = endcap
    if ("xvalue" in ability) {
      newendcap = newendcap.replace("X", ability.xvalue)
    }
    if ("yvalue" in ability) {
      newendcap = newendcap.replace("Y", ability.yvalue)
    }
    if ("xvalue" in ability || "yvalue" in ability) {
      effect = effect.replace(" " + endcap, " " + newendcap)
    }
  }

  if (filters.hideUnavailable && (inactive || !gateOpen)) return

  return <li key={index} 
      className={"ability-summary__timing-group__ability-line" 
        + (ability.cost ? " activateable" : "") 
        + (((exhausted && ability.timing !== "passive") || discarded) ? " disabled" : "") 
        + (slotHovered ? " slot-hovered" : "")
        + (!gateOpen ? " gate-closed" : "")
      }
      onClick={() => !inactive && gateOpen && activateAbility(ability, loadoutState, triskelionState)}
      onPointerEnter={() => loadoutState?.setState(ability.slot, "highlighted", true)}
      onPointerLeave={() => loadoutState?.setState(ability.slot, "highlighted", false)}
    >
      {ability.gate &&
        <span>
          {!gateOpen && getIcon({name: "Lock", invert: true})}
          {" "}
          {createGate([ability.gate.split(" ")[0]], [ability.gate.split(" ")[1]], getGateColor(ability.gate.split(" ")[0]))} 
          {" "}
        </span>}

      {ability.cost && 
        <span>{ability.cost.split(" ").map((cost, i) => <>{getIcon({name: cost, invert: true, index: i})} </>)}</span>}

      <span>{"keyword" in ability
        ? createTooltip(effect)
        : <FormattedParagraph paragraph={effect} inLineGate={true} invertIcons={true} />
      }</span>

    </li>
}

function TimingGroup({index, timing, abilities, filters, loadoutState, triskelionState}) {
  let timingDisplay = timing
  if (timing === "SAW") timingDisplay = "Second Ability Window"
  else if (timing === "FAW") timingDisplay = "First Ability Window"

  return <ul key={index} className="ability-summary__timing-group">
    <h4>{timingDisplay}</h4>
    {abilities[timing].map((ability, i) => 
      <AbilityLine ability={ability} filters={filters} index={i} loadoutState={loadoutState} triskelionState={triskelionState} />
    )}
  </ul>
}

function AbilitySummary({ loadout, loadoutState, triskelionState }) {
  const { appState, cardCache } = useLocalStorage();
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState({});
  const [abilities, setAbilities] = useState({});
  const [hideUnavailable, setHideUnavailable] = useState(false);

  const isNotMobile = window.matchMedia('(hover: hover)').matches;

  useEffect(() => {
    setCards(Object.keys(loadout).reduce((obj, slot) => {
      const card = cardCache?.get(loadout[slot])
      obj[slot] = loadout[slot] 
        ? card?.functionalAbilities || {}
        : {}
      return obj
    }, {}))
  }, [appState.activeLoadout])

  function addAbility(slot, ability) {
    setAbilities(prev => {
      const abilityDef = {
        slot: slot,
        ...ability,
      }

      return {
        ...prev,
        [ability.timing]: [
          ...(prev[ability.timing] ?? []),
          abilityDef
        ]
      }
    })
  }

  useEffect(() => {
    setAbilities({})
    Object.keys(cards).map(slot => 
      cards[slot].length > 0 && cards[slot].map(ability =>
        addAbility(slot, ability)
      )
    )
  }, [cards, loadoutState])

  const PrimordialAttackOrder = [
    "When you are about to resolve an Evasion Roll",
    "Evasion Roll",
    "Crit Evade",
    "Crit Evade Fail",
    "After counting hits from an Evasion Roll",
    "After counting hits from a Skill test caused by a Judgement",
    "Armor Roll",
    "When you are about to draw a Trauma card",
    "When you are about to draw an Obol",
    "After you draw a Trauma or Obol card",
    "When you survive an Obol",
    "After you resolve a Primordial Attack against you"
  ]
  const TitanAttackOrder = [
    "When you attack",
    "Attack Declaration",
    "When you are about to Attack",
    "Attack Roll",
    "Crit Chance",
    "Crit Miss",
    "Each Hit",
    "Full Hit",
    "Full Miss",
    "FAW",
    "Draw a BP card step",
    "Draw BP card step",
    "Power Roll",
    "Wound",
    "When the Primordial moves away from you because of a Response",
    "Clear the Kratos Pool step",
    "SAW"
  ]

  const filters = {
    hideUnavailable: hideUnavailable
  }

  return (
    <div className={"ability-summary" + (isOpen ? " open" : "")}>
      <div className={`ability-summary__thumb ${(isOpen && !isNotMobile) ? "flip-thumb" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        {getIcon({name: "Options", invert: true, size: "1.4em"})}
      </div>

      <div className="ability-summary__action-bar">
        <div className="filter-controls">
          Hide Unusable
          <label className="filters-switch">
            <input type="checkbox" checked={hideUnavailable} onChange={() => setHideUnavailable(!hideUnavailable)} />
            <span className="filters-slider" />
          </label>
        </div>

      </div>

      <div className="ability-summary__abilities-list">
        <div className="ability-summary__category">
          <h3>Primordial Attack</h3>
          {PrimordialAttackOrder.map((timing, index) => {
            return timing in abilities &&
              <TimingGroup abilities={abilities} timing={timing} filters={filters} index={index} loadoutState={loadoutState} triskelionState={triskelionState} />
          })}
        </div>

        <div className="ability-summary__category">
          <h3>Titan Attack</h3>
          {TitanAttackOrder.map((timing, index) => {
            return timing in abilities &&
              <TimingGroup abilities={abilities} timing={timing} filters={filters} index={index} loadoutState={loadoutState} triskelionState={triskelionState} />
          })}
        </div>

        <div className="ability-summary__category">
          <h3>Other</h3>
          {Object.keys(abilities).map((timing, index) => 
            !([...PrimordialAttackOrder, ...TitanAttackOrder].includes(timing)) && 
              <TimingGroup abilities={abilities} timing={timing} filters={filters} index={index} loadoutState={loadoutState} triskelionState={triskelionState} />
          )}
        </div>
      </div>

    </div>
  )
}

export default AbilitySummary