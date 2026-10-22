import { useCollectionsContext } from "../hooks/CollectionsContext"

const CollectionsSelector = () => {
  const { currentSetType, setCurrentSetType, setTypes } = useCollectionsContext()

  return <div className="collections-selector">
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

export default CollectionsSelector