import LoadoutSlot from "../slot/LoadoutSlot"

const LoadoutTitanSlot = ({loadoutState}) => {
  const cardStates = {
    highlighted: loadoutState.slotStates["Titan"]?.highlighted,
    setHighlighted: (state) => loadoutState.setState("Titan", "highlighted", state),
  }


  return <LoadoutSlot slotName="Titan" type="Titan" cardType="Titan" cardStates={cardStates} />
  //returns a set of layered slots, titan in the background, two pattern slots on top
}

export default LoadoutTitanSlot