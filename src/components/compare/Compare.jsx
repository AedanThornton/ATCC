import { useEffect, useState } from "react"
import "./Compare.css"
import { useLocalStorage } from "../../context/LocalStorageContext"
import CardRenderer from "../cards/CardRenderer"
import { toPercent } from "../../lib/extraMath.js"
import { getPowerDiceList, calculateHitChance } from "../../lib/gearEvalution.js"
import SearchableList from "../utils/SearchableList.jsx"
import getIcon from "../utils/iconUtils.jsx"
import { useAllCards } from "../../hooks/useAllCards.js"

const Compare = ({}) => {
  const { ingestCards, appState, cardCache } = useLocalStorage()
  const { data, isLoading, error } = useAllCards()
  const [cards, setCards] = useState([])
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
    "Power Tier": card => card.tier || "missing data",
  }
  const compareRowsOffense = {
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
    "% Hit/Full Miss": card => {
      const hitChance = calculateHitChance({ 
        diceCount: parseInt(card.offensiveStatistics.attackDice), 
        precision: parseInt(card.offensiveStatistics.precision),
        desiredHits: 1,
        toHitTarget: inputArgs.toHitTarget
      })

      return (<>
        <span style={{color: "rgb(0, 255, 8)"}}>{toPercent(hitChance)}</span>
        {" / "}
        <span style={{color: "rgb(211, 21, 21)"}}>{toPercent(1 - hitChance)}</span>
      </>)
    },
    "% Full Hit": card => toPercent(calculateHitChance({ 
      diceCount: parseInt(card.offensiveStatistics.attackDice), 
      precision: parseInt(card.offensiveStatistics.precision),
      desiredHits: parseInt(card.offensiveStatistics.attackDice),
      toHitTarget: inputArgs.toHitTarget
    })),
    "% Wound/Fail (max hits)": card => card.cycle,
    "% Wound/Fail (rolled hits)": card => card.cycle,
  }
  const compareRowsDefense = {

  }
  const cachedCards = data ? data.cards : []
  const gearNames = cachedCards
    .filter(card => card.cardType.toLowerCase() === 'gear')
    .map(card => {return {id: card.cardIDs[0], name: card.name}})

  useEffect(() => {
    ingestCards(cachedCards)
  }, [cachedCards])

  useEffect(() => {
    const cardSet = appState.activeSet.map(id => cardCache.get(id)).filter(Boolean)
    if (cardSet.length > 0) setCards(cardSet.filter(c => c.cardType === "Gear"))
  }, [appState])
    

  const addPanel = () => {
    setCards([
      ...cards,
      {}
    ])
  }

  const setPanelCard = (pos, id) => {
    const newCards = [...cards]
    newCards[pos] = cachedCards.filter(card => card.cardIDs[0] === id)[0]
    setCards(newCards)
  }

  const removePanelCard = (pos) => {
    const newCards = [...cards]
    newCards.splice(pos, 1)
    setCards(newCards)
  }

  return (
    <div className="compare">

      <div className="compare-labels">
        <div className="compare-panel__controls" style={{backgroundColor: "var(--main-midtone)"}}><div className="compare-panel__controls-button" style={{backgroundColor: "var(--main-midtone)"}}></div></div>{/* controls placeholder */}
        <div className="compare-panel__card"><div className="mini-american" style={{width: 0}}></div></div>{/* card placeholder */}
        {Object.keys(compareRows).map((rowName, i) => (
          <div key={i} className="compare-panel__details compare-labels-item">
            {rowName}
          </div>
        ))}
        {Object.keys(compareRowsOffense).map((rowName, i) => (
          <div key={i} className="compare-panel__details compare-labels-item">
            {rowName}
          </div>
        ))}
        {Object.keys(compareRowsDefense).map((rowName, i) => (
          <div key={i} className="compare-panel__details compare-labels-item">
            {rowName}
          </div>
        ))}
        <div className="compare-panel__spacer"></div>
      </div>

      <div className="compare-panels">
        {cards.map((card, i) => {
          const cardHasData = typeof card === "object" && Object.keys(card).length > 0

          return <div key={i} className="compare-panel">
            <div className="compare-panel__controls">
              {/* rearrange */}
              <div className="compare-panel__controls-button">{getIcon({name: "List", invert: true})}</div>
              {/* editable name field to swap with different card */}
              <SearchableList items={gearNames} onItemClick={(id) => setPanelCard(i, id)} customPlaceholder="Select card..." />
              {/* remove from compare */}
              <div className="compare-panel__controls-button" onClick={() => removePanelCard(i)}>X</div>
            </div>

            <div className="compare-panel__card">
              {cardHasData
                ? <CardRenderer cardData={card} notDraggable={true} />
                : <div className="mini-american"></div>
              }
            </div>

            {Object.keys(compareRows).map((rowName, i) => (
              <div key={i} className="compare-panel__details">
                {(cardHasData && (compareRows[rowName](card) === 0 || compareRows[rowName](card))) ? compareRows[rowName](card) : "-"}
              </div>
            ))}
            {Object.keys(compareRowsOffense).map((rowName, i) => (
              <div key={i} className="compare-panel__details">
                {(cardHasData && Object.keys(card.offensiveStatistics).length > 0 && (compareRowsOffense[rowName](card) === 0 || compareRowsOffense[rowName](card))) ? compareRowsOffense[rowName](card) : "-"}
              </div>
            ))}
            {Object.keys(compareRowsDefense).map((rowName, i) => (
              <div key={i} className="compare-panel__details">
                {(cardHasData && Object.keys(card.defensiveStatistics).length > 0 && (compareRowsDefense[rowName](card) === 0 || compareRowsDefense[rowName](card))) ? compareRowsDefense[rowName](card) : "-"}
              </div>
            ))}

            <div className="compare-panel__spacer"></div>
          </div>
        })}
      </div>

      <div className="compare-add-panel">
        <div onClick={() => addPanel()} className="compare-add-panel__button">+</div>
      </div>

    </div>
  )
}

export default Compare