//Returns a Triskelion element, which is a rendered object that takes in 3 stateful variables for the three stats, and can be right/left clicked to lower/raise the indicated stat
// Also has a "reset" button to set all stats to zero

//When used in a Loadout, parent should get and set state to LocalStorage so it persists on reload

//Toggle to switch between simplified and fancy display
//Minimize/maximize (same as above?)

import { useState } from "react"
import getIcon from "../utils/iconUtils"
import DragInput from "./DragInput"
import "./triskelion.css"
import { getGateColor } from "../../lib/colors"

function TriskelionStatBox({triskelionState, statname}) {
  
  return (
    <div 
      className="triskelion__stat-box"
      style={{borderColor: getGateColor(statname)}}
      onPointerDown={(e) => {
        if (e.button === 0) triskelionState.plusStat(statname)
        else if (e.button === 2) triskelionState.minusStat(statname)
      }}
      onWheel={(e) => {
        if (e.deltaY > 0) triskelionState.minusStat(statname)
        else if (e.deltaY < 0) triskelionState.plusStat(statname)
      }}
      onContextMenu={e => e.preventDefault()}
    >
      {getIcon({name: statname, invert: true, size: "1rem"})}
      <div style={{cursor: "s-resize"}}><DragInput value={triskelionState[statname.toLowerCase()]} setValue={triskelionState.getStatSetter(statname)} /></div>
    </div>
  )
}

function Triskelion({triskelionState}) {
  const [simpleDisplay, setSimpleDisplay] = useState(true)

  function resetAll() {
    triskelionState.resetStat("rage")
    triskelionState.resetStat("fate")
    triskelionState.resetStat("danger")
  }

  return <div className="triskelion">
    <div className="triskelion__buttons">
      <div className="triskelion__button left" onPointerDown={() => setSimpleDisplay(!simpleDisplay)}>{getIcon({name: "List", invert: true, size: "0.8rem"})}</div>
      <div className="triskelion__button right" onPointerDown={() => resetAll()}>{getIcon({name: "Reset", invert: true, size: "0.8rem"})}</div>
    </div>
    <TriskelionStatBox statname="Rage" triskelionState={triskelionState} />
    <TriskelionStatBox statname="Fate" triskelionState={triskelionState} />
    <TriskelionStatBox statname="Danger" triskelionState={triskelionState} />
  </div>
}

export default Triskelion