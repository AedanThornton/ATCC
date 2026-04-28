import { Link } from "react-router-dom"
import getIcon from "../utils/iconUtils"

const BackpackMenu = ({}) => {
  return <div className="backpack-menu">
    <div>{getIcon({ name: "Save", invert: true })}</div>
    <div>{getIcon({ name: "Load", invert: true })}</div>
    <Link to="/compare">{getIcon({ name: "Compare", invert: true })}</Link>
    <Link to="/savedsets">{getIcon({ name: "SavedSets", invert: true })}</Link>
    <Link to="/deck">{getIcon({ name: "Deck", invert: true })}</Link>
    <Link to="/loadoutbuilder">{getIcon({ name: "LoadoutBuilder", invert: true })}</Link>
    <Link to="/simulator">{getIcon({ name: "Simulator", invert: true })}</Link>
  </div>
}

export default BackpackMenu