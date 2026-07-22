import { useSavedSetsContext } from "../../context/SavedSetsContext"

const SavedSetsSelector = () => {
  const { currentSetType, setCurrentSetType, setTypes } = useSavedSetsContext()

  return <div className="saved-sets-selector">
    {setTypes.length > 0 && setTypes.map((setType, i) => (
      <button
        key={i}
        onClick={() => setCurrentSetType(setType)}
        disabled={currentSetType === setType}
      >
        {setType}</button>
    ))}
  </div>
}

export default SavedSetsSelector