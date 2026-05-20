import { Link } from "react-router-dom"
import getIcon from "../utils/iconUtils"

const BackpackMenu = ({ set }) => {
  return <div className="backpack-side-controls">
    <Link to="/savedsets">{getIcon({ name: "List", invert: true })}</Link>
    <Link to="/deck" state={{ cardSetName: set }}>{getIcon({ name: "EditDeck", invert: true })}</Link>
    {/* <Link to="/compare">{getIcon({ name: "Compare", invert: true })}</Link> */}
    <Link to="/loadoutbuilder">{getIcon({ name: "LoadoutBuilder", invert: true })}</Link>
    {/* <Link to="/simulator">{getIcon({ name: "Simulator", invert: true })}</Link> */}
  </div>
}

export default BackpackMenu;