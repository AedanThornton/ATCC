// A menu that shows a summary of the available abilities among all cards in the Active Loadout
// (Optionally) takes in triskelion stateful variables to use for stat gates. This will likely be tied to the Active Loadout
// Takes in the state of all cards in the Active Loadout (exhausted, discard, etc.)

// Grabs all of the functional abilities
// Picks out the weapons, and has a menu to select the active weapon
// Sorts abilities by timing window, and groups them if stackable, ignoring all abilities on non-active weapons
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../context/LocalStorageContext"
import FormattedParagraph from "../utils/FormattedParagraph";
import createTooltip from "../utils/tooltipsUtil";
import "./abilitysummary.css"
import getIcon from "../utils/iconUtils";

function activateAbility(ability, loadoutState) {
  if (ability.cost.split(" ").includes("Exhaust")) {
    loadoutState?.setState(ability.slot, "exhausted", true)
  }
  if (ability.cost.split(" ").includes("Discard")) {
    loadoutState?.setState(ability.slot, "discarded", true)
  }
}

function TimingGroup({index, timing, abilities, loadoutState}) {
  return <ul key={index} className="ability-summary__timing-group">
    <h4>{timing}</h4>
    {abilities[timing].map((ability, i) => {
      const exhausted = loadoutState.slotStates[ability.slot].exhausted
      const discarded = loadoutState.slotStates[ability.slot].discarded
      const inactive = exhausted || discarded
      const slotHovered = loadoutState.slotStates[ability.slot].highlighted

      return <li key={i} 
          className={"ability-summary__timing-group__ability-line" + (ability.cost ? " activateable" : "") + (((exhausted && ability.timing !== "passive") || discarded) ? " disabled" : "") + (slotHovered ? " slot-hovered" : "")}
          onClick={() => !inactive && activateAbility(ability, loadoutState)}
          onPointerEnter={() => loadoutState?.setState(ability.slot, "highlighted", true)}
          onPointerLeave={() => loadoutState?.setState(ability.slot, "highlighted", false)}
        >

          {ability.cost && 
            <span>{ability.cost.split(" ").map((cost, i) => <>{getIcon({name: cost, invert: true, index: i})} </>)}</span>}

          <span>{"keyword" in ability
            ? createTooltip(ability.effect)
            : <FormattedParagraph paragraph={ability.effect} inLineGate={true} invertIcons={true} />
          }</span>

        </li>
      }
    )}
  </ul>
}

function AbilitySummary({ loadout, loadoutState }) {
  const { appState, cardCache } = useLocalStorage();
  const [cards, setCards] = useState({});
  const [abilities, setAbilities] = useState({});

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
    "Crit Evade",
    "After counting hits from an Evasion Roll",
    "After you draw a Trauma or Obol card"
  ]
  const TitanAttackOrder = [
    "FAW",
    "Draw a BP card step",
    "Wound",
    "SAW"
  ]

  return (
    <div className="ability-summary">
      <div className="ability-summary__category">
        <h3>Primordial Attack</h3>
        {PrimordialAttackOrder.map((timing, index) => {
          return timing in abilities &&
            <TimingGroup abilities={abilities} timing={timing} index={index} loadoutState={loadoutState} />
        })}
      </div>

      <div className="ability-summary__category">
        <h3>Titan Attack</h3>
        {TitanAttackOrder.map((timing, index) => {
          return timing in abilities &&
            <TimingGroup abilities={abilities} timing={timing} index={index} loadoutState={loadoutState} />
        })}
      </div>

      <div className="ability-summary__category">
        <h3>Other</h3>
        {Object.keys(abilities).map((timing, index) => 
          !([...PrimordialAttackOrder, ...TitanAttackOrder].includes(timing)) && 
            <TimingGroup abilities={abilities} timing={timing} index={index} loadoutState={loadoutState} />
        )}
      </div>
    </div>
  )
}

export default AbilitySummary