//Card Menu for CardRenderer within a LoadoutSlot

//buttons:
// * Exhaust (rotate sideways) -- switches to Unexhaust
// * Discard (gray-out)
// * Add counter (open sub-menu. Ambrosia, Midas, Energy, Generic)
// * Clear card (empties slot)

const LoadoutSlotCardMenu = ({ setActiveGear }) => {
  return (
    <div className="card-menu">
      <button onClick={() => setActiveGear(null)}>✖</button>
    </div>
  )
}

export default LoadoutSlotCardMenu;