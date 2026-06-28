import React, { useState } from "react"
import getIcon from "./utils/iconUtils"
import "./deck/deck.css"

const RectractableMenu = ({ preformattedButtons, customButtons }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return <div className={`retractable-menu ${menuOpen ? "open" : ""}`}>

    {customButtons.map((button, i) => (
      <React.Fragment key={i}>
        {button}
      </React.Fragment>
    ))}

    {preformattedButtons.map((button, i) => (
      <button key={i}
        className="deck-page__action-button"
        onClick={() => button.clickFunc()}
        disabled={button.isDisabled}
      >
        {getIcon({ name: button.iconName, size: "1.5em", invert: true })}
      </button>
    ))}

    <button className="retractable-menu__display-button" onClick={() => setMenuOpen(!menuOpen)}>
      {getIcon({name: "Options", invert: true})}
    </button>

  </div>
}

export default RectractableMenu