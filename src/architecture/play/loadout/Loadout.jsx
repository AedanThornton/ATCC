import "../loadout/styles/loadout.css"
import LoadoutSlotGroup from "./components/LoadoutSlotGroup"
import { useState } from "react"
import LoadoutTitanSlot from "./components/LoadoutTitanSlot"
import { HandSlotGroup } from "./components/HandSlotGroup"
import { LoadoutProvider } from "./hooks/LoadoutContext"
import { useLoadout } from "./hooks/useLoadout"
import AbilitySummary from "./abilitysummary/AbilitySummary"
import { useLocalStorage } from "../../../management/localstorage/LocalStorageContext"
import Triskelion from "../../play/triskelion/Triskelion"
import { useTriskelion } from "../../play/triskelion/useTriskelion"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"

const Loadout = ({}) => {
  const loadoutState = useLoadout();
  const triskelionState = useTriskelion();
  const { appState } = useLocalStorage();

  return (
    <TransformWrapper
      minScale={0.2}
      initialScale={0.7}
      maxScale={2}
      limitToBounds={false}
      centerZoomedOut={false}
      wheel={{ step: 0.001 }}
    >
      <LoadoutProvider>
        <div className="loadout">
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            contentStyle={{
              width: "max-content",
              height: "max-content",
            }}
          >
            <div className="loadout-main">
              <div className="loadout-groups-container">
                <div style={{gridRow: "1", gridColumn: "1"}}><LoadoutTitanSlot loadoutState={loadoutState} /></div>
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
          </TransformComponent>
          <Triskelion triskelionState={triskelionState} />
        </div>
        <AbilitySummary loadout={appState.activeLoadout} loadoutState={loadoutState} triskelionState={triskelionState} />
      </LoadoutProvider>
    </TransformWrapper>
  )
}

export default Loadout