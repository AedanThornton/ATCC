import "./loadout.css"
import LoadoutSlotGroup from "./LoadoutSlotGroup"
import { useState } from "react"
import LoadoutTitanSlot from "./LoadoutTitanSlot"
import { HandSlotGroup } from "./HandSlotGroup"
import { LoadoutProvider, useLoadout } from "../../context/LoadoutContext"

const Loadout = ({}) => {
  const [zoom, setZoom] = useState(0.7);

  return (
    <LoadoutProvider>
      <div className="loadout">
        <div className="loadout-main" style={{transform: `scale(${zoom})`, transformOrigin: "top left", height: `${100/zoom}%`, width: `${100/zoom}%`}}>
          <div className="loadout-groups-container">
            <div style={{gridRow: "1", gridColumn: "1"}}><LoadoutTitanSlot /></div>
            <div style={{gridRow: "1", gridColumn: "2"}}><LoadoutSlotGroup cardType="Fated Mnemos" slotTypes={["FatedMnemos", "FatedMnemos"]}/></div>
          </div>
          <div className="loadout-groups-container" style={{ height: "95%" }}>
            <div className="loadout-groups-container" style={{gridRow: "1", gridColumn: "1"}}>
              <LoadoutSlotGroup cardType="Mnemos" slotTypes={["Mnemos", "Mnemos"]} numRows={2}/>
            </div>
            <div className="loadout-groups-container" style={{gridRow: "1", gridColumn: "2", transform: "scale(0.8)"}}>
              <div style={{gridRow: "1", gridColumn: "1"}}><LoadoutSlotGroup cardType="Gear" slotTypes={["Armor"]} /></div>
              <div style={{gridRow: "1", gridColumn: "2/5"}}><HandSlotGroup /></div>
              <div style={{gridRow: "2", gridColumn: "1/4"}}><LoadoutSlotGroup cardType="Gear" slotTypes={Array(2).fill("Support")} isExtendible={true} /></div>
              <div style={{gridRow: "3", gridColumn: "1/3"}}><LoadoutSlotGroup cardType="Gear" slotTypes={["Attachment", "Attachment", "Attachment"]} /></div>
            </div>
          </div>
        </div>
      </div>
    </LoadoutProvider>
  )
}

export default Loadout