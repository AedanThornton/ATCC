import "./loadout.css"
import SavedSets from "../savedsets/SavedSets"
import LoadoutSlotGroup from "./LoadoutSlotGroup"
import { useState } from "react"
import LoadoutTitanSlot from "./LoadoutTitanSlot"

const Loadout = ({}) => {
  const [zoom, setZoom] = useState(0.7);

  return (
    <div className="loadout">
      <SavedSets />
      <div className="loadout-main">
        <div style={{transform: `scale(${zoom})`, transformOrigin: "top left", height: `${zoom * 100}%`, width: `${zoom * 100}%`}}>
          <div className="loadout-groups-container">
            <div style={{gridRow: "1", gridColumn: "1"}}><LoadoutSlotGroup cardType="Fated Mnemos" slotTypes={["Doom", "Doom"]}/></div>
            <div style={{gridRow: "1", gridColumn: "2"}}><LoadoutTitanSlot /></div>
          </div>
          <div className="loadout-groups-container">
            <div className="loadout-groups-container" style={{gridRow: "1", gridColumn: "1"}}>
              <LoadoutSlotGroup cardType="Mnemos" slotTypes={["Progress", "Progress"]} numRows={2}/>
            </div>
            <div className="loadout-groups-container" style={{gridRow: "1", gridColumn: "2", transform: "scale(0.8)", height: `${80}%`}}>
              <div style={{gridRow: "1", gridColumn: "1"}}><LoadoutSlotGroup cardType="Gear" slotTypes={["Armor"]} /></div>
              <div style={{gridRow: "1", gridColumn: "2/5"}}><LoadoutSlotGroup cardType="Gear" slotTypes={["OneHanded", "OneHanded"]} isExtendible={true} /></div>
              <div style={{gridRow: "2", gridColumn: "1/4"}}><LoadoutSlotGroup cardType="Gear" slotTypes={["Support", "Support"]} isExtendible={true} /></div>
              <div style={{gridRow: "3", gridColumn: "1/3"}}><LoadoutSlotGroup cardType="Gear" slotTypes={["Attachment", "Attachment", "Attachment"]} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loadout