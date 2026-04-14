import WoOIconBase from "/src/assets/icons/WoOLayer2.svg"
import WoOIconBackground from "/src/assets/icons/WoOLayer3.svg"
import WoOIconOverlay from "/src/assets/icons/WoOLayer1.svg"

function cycleFilters(cycle) {
  const options = {
    "Cycle I": "brightness(0) saturate(100%) invert(7%) sepia(16%) saturate(4660%) hue-rotate(349deg) brightness(94%) contrast(100%)",    //#270F03
    "Cycle II": "brightness(0) saturate(100%) invert(8%) sepia(36%) saturate(4935%) hue-rotate(351deg) brightness(101%) contrast(97%)",   //#4D120B
    "Cycle III": "brightness(0) saturate(100%) invert(9%) sepia(19%) saturate(1368%) hue-rotate(241deg) brightness(92%) contrast(92%)",   //#271a2b
    "Cycle IV": "brightness(0) saturate(100%) invert(5%) sepia(13%) saturate(3931%) hue-rotate(18deg) brightness(91%) contrast(97%)",     //#131004
    "Cycle V": "brightness(0) saturate(100%) invert(10%) sepia(28%) saturate(740%) hue-rotate(172deg) brightness(102%) contrast(94%)",    //#19232f
    "Adversary": "brightness(0) saturate(100%) invert(88%) sepia(2%) saturate(723%) hue-rotate(340deg) brightness(91%) contrast(89%)",    //#ccc4bf
    "Interrupt": "brightness(0) saturate(100%) invert(83%) sepia(40%) saturate(6945%) hue-rotate(10deg) brightness(84%) contrast(73%)",    //#AD8A23
  }

  return options[cycle] || ""
}

function standardFilters(color) {
  const options = {
    "papyrus": "brightness(0) saturate(100%) invert(96%) sepia(61%) saturate(150%) hue-rotate(325deg) brightness(91%) contrast(91%)",           //#dfdbcd
    "white": "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(355deg) brightness(105%) contrast(100%)"   //#ffffff
  }

  return options[color] || ""
}

const WoOIcon = ({ cycle, isInterrupt = false }) => (
  <div className="woo-icon" style={{ width: isInterrupt ? "54px" : "18px", height: isInterrupt ? "24px" : "18px" }}>
    <div className="woo-icon-rectangle" style={{ height: isInterrupt ? "50%" : "70%" , top: isInterrupt ? "25%" : "15%" }} />
    <img src={WoOIconBase} style={{ filter: standardFilters(cycle === "Adversary" ? "black" : "papyrus") }} />
    <img src={WoOIconBackground} style={{ filter: standardFilters((cycle === "Adversary" && !isInterrupt) ? "black" : "white") }} />
    <img src={WoOIconOverlay} style={{ filter: cycleFilters(isInterrupt ? "Interrupt" : cycle) }} />
  </div>
)

export default WoOIcon