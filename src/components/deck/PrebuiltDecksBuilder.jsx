import { useEffect } from "react"

const PrebuiltDecksDropdownButton = ({displayName, dropdownItems, disabled = false}) => {
  return <div className={`prebuilt-decks-dropdown__button ${disabled ? "disabled" : ""}`}>
    {displayName}
    <ul className="prebuilt-decks-dropdown">
      {dropdownItems}
    </ul>
  </div>
}

const PrebuiltDecksBuilder = ({ deckState }) => {
  //reset on reload
  useEffect(() => {
    const newParams = new URLSearchParams()

    newParams.set("type", "")
    newParams.set("name", "")
    newParams.set("variant", "")

    deckState.setDeckParams(newParams)
  }, [])


  const typeSelected = deckState?.deckParams?.get("type")

  const handleUpdateParams = (paramName, newParamVal) => {
    const newParams = new URLSearchParams(deckState.deckParams)

    if (paramName === "type") newParams.set("type", newParamVal); else newParams.set("type", deckState.deckParams.get("type"))
    if (paramName === "name") newParams.set("name", newParamVal); else newParams.set("name", deckState.deckParams.get("name"))
    if (paramName === "variant") newParams.set("variant", newParamVal); else newParams.set("variant", deckState.deckParams.get("variant"))

    deckState.setDeckParams(newParams)
  }

  return (
    <div className="deck-page__action-bar">
      <div className="deck-page__set-title">
        <PrebuiltDecksDropdownButton
          displayName={typeSelected ? deckState.deckParams.get("type") : "Type"}
          dropdownItems={<>
            <li onClick={() => handleUpdateParams("type", "primordial")}>Primordial</li>
            <li onClick={() => handleUpdateParams("type", "exploration")}>Exploration</li>
          </>}
        />

        {!typeSelected && <PrebuiltDecksDropdownButton
          displayName="Name"
          disabled={true}
        />}
        {!typeSelected && <PrebuiltDecksDropdownButton
          displayName="Variant"
          disabled={true}
        />}

        {typeSelected === "primordial" && <PrebuiltDecksDropdownButton 
          displayName={deckState.deckParams.get("name") !== "" ? deckState.deckParams.get("name") : "Name"}
          dropdownItems={<>
            {deckState.prebuiltDeck.isLoading && <li>Options loading...</li>}
            {deckState.prebuiltDeck.error && <li>Error loading options... {deckState.prebuiltDeck.error}</li>}
            {deckState.prebuiltDeck.primordialOptions.map((primordial, i) =>
              <li key={i} onClick={() => handleUpdateParams("name", primordial)}>{primordial}</li>
            )}
          </>}
        />}
        {typeSelected === "exploration" && <PrebuiltDecksDropdownButton 
          displayName={deckState.deckParams.get("name") !== "" ? deckState.deckParams.get("name") : "Name"}
          dropdownItems={<>
            <li onClick={() => handleUpdateParams("name", "Cycle I")}>Cycle I</li>
            <li onClick={() => handleUpdateParams("name", "Cycle II")}>Cycle II</li>
            <li onClick={() => handleUpdateParams("name", "Cycle III")}>Cycle III</li>
            <li onClick={() => handleUpdateParams("name", "Cycle IV")}>Cycle IV</li>
            <li onClick={() => handleUpdateParams("name", "Cycle V")}>Cycle V</li>
          </>}
        />}


        {typeSelected === "primordial" && <PrebuiltDecksDropdownButton
          displayName={deckState.deckParams.get("variant") !== "" ? deckState.deckParams.get("variant") : "Variant"}
          dropdownItems={<>
            <li onClick={() => handleUpdateParams("variant", "ai")}>AI</li>
            <li onClick={() => handleUpdateParams("variant", "bp")}>BP</li>
          </>}
        />}
        {typeSelected === "exploration" && <PrebuiltDecksDropdownButton
          displayName={deckState.deckParams.get("variant") !== "" ? deckState.deckParams.get("variant") : "Variant"}
          dropdownItems={<>
            <li onClick={() => handleUpdateParams("variant", "0")}>Acclimation 0</li>
            <li onClick={() => handleUpdateParams("variant", "1")}>Acclimation 1</li>
            <li onClick={() => handleUpdateParams("variant", "2")}>Acclimation 2</li>
            <li onClick={() => handleUpdateParams("variant", "3")}>Acclimation 3</li>
            <li onClick={() => handleUpdateParams("variant", "all")}>All</li>
          </>}
        />}
      </div>
    </div>
  )
}

export default PrebuiltDecksBuilder;