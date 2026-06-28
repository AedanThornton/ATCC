import React from "react"
import getIcon from "./utils/iconUtils"
import "./deck/deck.css"

const RectractableMenu = ({ preformattedButtons, customButtons }) => {

  return <div className="deck-page__action-sidebar">

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

  </div>
}

export default RectractableMenu