import getIcon from "../utils/iconUtils"
import { useState } from "react"

const BackpackTabSelector = ({ showBackpack }) => {
  const [tab, setTab] = useState("Backpack")

  return <div className={`backpack-tab-selector ${showBackpack ? "backpack-open" : ""}`}>
    <button
      onClick={() => setTab("Backpack")}
      disabled={tab === "Backpack"}
    >
      {getIcon({ name: "Backpack", invert: true })}</button>

    <button
      onClick={() => setTab("SavedSets")}
      disabled={tab === "SavedSets"}
    >
      {getIcon({ name: "List", invert: true })}</button>

    <button
      onClick={() => setTab("Deck")}
      disabled={tab === "Deck"}
    >
      {getIcon({ name: "EditDeck", invert: true })}</button>

    <button
      onClick={() => setTab("Compare")}
      disabled={tab === "Compare"}
    >
      {getIcon({ name: "Compare", invert: true })}</button>

    <button
      onClick={() => setTab("LoadoutBuilder")}
      disabled={tab === "LoadoutBuilder"}
    >
      {getIcon({ name: "LoadoutBuilder", invert: true })}</button>

    <button
      onClick={() => setTab("Simulator")}
      disabled={tab === "Simulator"}
    >
      {getIcon({ name: "Simulator", invert: true })}</button>
  </div>
}

export default BackpackTabSelector;