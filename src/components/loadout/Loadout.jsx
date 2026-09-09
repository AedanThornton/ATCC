import "./loadout.css"
import SavedSets from "../savedsets/SavedSets"
import LoadoutSlotGroup from "./LoadoutSlotGroup"
import LoadoutSlot from "./slot/LoadoutSlot"

const Loadout = ({}) => {
  return (
    <div className="loadout">
      <SavedSets />
      <div className="loadout-main">
        <LoadoutSlot type="Titan" cardType="titan" />
        <div className="loadout-groups-container">
          <LoadoutSlotGroup cardType="mnemos" slotTypes={["Progress", "Progress"]}/>
          <LoadoutSlotGroup cardType="mnemos" slotTypes={["Doom", "Doom"]}/>
        </div>
        <div className="loadout-groups-container">
          <div style={{gridRow: "1/3", gridColumn: "1"}}><LoadoutSlotGroup cardType="gear" slotTypes={["Attachment", "Attachment", "Armor", "Attachment"]} numRows={2} /></div>
          <div style={{gridRow: "1", gridColumn: "2"}}><LoadoutSlotGroup cardType="gear" slotTypes={["OneHanded", "OneHanded"]} isExtendible={true} /></div>
          <div style={{gridRow: "2", gridColumn: "2"}}><LoadoutSlotGroup cardType="gear" slotTypes={["Support", "Support"]} isExtendible={true} /></div>
        </div>
      </div>
    </div>
  )
}

export default Loadout