import "./loadout.css"
import LoadoutSlotGroup from "./LoadoutSlotGroup"
import { useState } from "react"
import LoadoutTitanSlot from "./LoadoutTitanSlot"
import { HandSlotGroup } from "./HandSlotGroup"
import { LoadoutProvider } from "../../context/LoadoutContext"
import { useLoadout } from "./useLoadout"
import AbilitySummary from "./AbilitySummary"
import { useLocalStorage } from "../../context/LocalStorageContext"

const Loadout = ({}) => {
  const loadoutState = useLoadout();
  const { appState } = useLocalStorage();

  const [zoom, setZoom] = useState(0.7);

  return (
    <LoadoutProvider>
      <div className="loadout">
        <div className="loadout-main" style={{transform: `scale(${zoom})`, transformOrigin: "top left", height: `${100/zoom}%`, width: `${100/zoom}%`}}>
          <div className="loadout-groups-container">
            <div style={{gridRow: "1", gridColumn: "1"}}><LoadoutTitanSlot /></div>
            <div style={{gridRow: "1", gridColumn: "2"}}><LoadoutSlotGroup loadoutState={loadoutState} cardType="Fated Mnemos" slotTypes={["FatedMnemos", "FatedMnemos"]}/></div>
          </div>
          <div className="loadout-groups-container" style={{ height: "95%" }}>
            <div className="loadout-groups-container" style={{gridRow: "1", gridColumn: "1"}}>
              <LoadoutSlotGroup loadoutState={loadoutState} cardType="Mnemos" slotTypes={["Mnemos", "Mnemos"]} numRows={2}/>
            </div>
            <div className="loadout-groups-container" style={{gridRow: "1", gridColumn: "2", transform: "scale(0.8)"}}>
              <div style={{gridRow: "1", gridColumn: "1"}}><LoadoutSlotGroup loadoutState={loadoutState} cardType="Gear" slotTypes={["Armor"]} /></div>
              <div style={{gridRow: "1", gridColumn: "2/5"}}><HandSlotGroup loadoutState={loadoutState} /></div>
              <div style={{gridRow: "2", gridColumn: "1/4"}}><LoadoutSlotGroup loadoutState={loadoutState} cardType="Gear" slotTypes={["Support", "Support"]} isExtendible={true} /></div>
              <div style={{gridRow: "3", gridColumn: "1/3"}}><LoadoutSlotGroup loadoutState={loadoutState} cardType="Gear" slotTypes={["Attachment", "Attachment", "Attachment"]} /></div>
            </div>
          </div>
        </div>

        <AbilitySummary loadout={appState.activeLoadout} loadoutState={loadoutState} />
      </div>
    </LoadoutProvider>
  )
}

export default Loadout