import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDecks } from '../../hooks/useDecks.js';

const PrebuiltDecksBuilder = ({ deckState }) => {
  const [prebuiltDeckParameters, setPrebuilDeckParameters] = useState({
    type: "",
    name: "",
    variant: "",
    level: "",
  })

  useEffect(() => {
    const newParams = new URLSearchParams(deckState.deckParams)

    newParams.set("type", prebuiltDeckParameters.type)
    newParams.set("name", prebuiltDeckParameters.name)
    newParams.set("variant", prebuiltDeckParameters.variant)

    deckState.setDeckParams(newParams)
    console.log(newParams.toString())
  }, [prebuiltDeckParameters])

  const handleSelectType = (newType) => {
    setPrebuilDeckParameters({ type: newType, name: "", variant: "" })
  }

  return (
    <div className="deck-page_set-title">
      <div className="prebuilt-decks-dropdown__button">
        {prebuiltDeckParameters.type ? prebuiltDeckParameters.type : "Type"}
        <ul className="prebuilt-decks-dropdown">
          <li onClick={() => handleSelectType("primordial")}>Primordial</li>
          <li onClick={() => handleSelectType("exploration")}>Exploration</li>
        </ul>
      </div>
      <div className="prebuilt-decks-dropdown__button">
        {prebuiltDeckParameters.name ? prebuiltDeckParameters.name : "Name"}
        <ul className="prebuilt-decks-dropdown">
          {prebuiltDeckParameters?.type === "primordial" && deckState.prebuiltDeck.isLoading && <li>Options loading...</li>}
          {prebuiltDeckParameters?.type === "primordial" && deckState.prebuiltDeck.error && <li>Error loading options... {deckState.prebuiltDeck.error}</li>}
          {prebuiltDeckParameters?.type === "primordial" &&
            deckState.prebuiltDeck.primordialOptions.map((primordial, i) =>
              <li key={i} onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, name: primordial }))}>{primordial}</li>
            )
          }
          {prebuiltDeckParameters?.type === "exploration" &&
            <><li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, name: "Cycle I" }))}>Cycle I</li>
              <li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, name: "Cycle II" }))}>Cycle II</li>
              <li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, name: "Cycle III" }))}>Cycle III</li>
              <li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, name: "Cycle IV" }))}>Cycle IV</li>
              <li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, name: "Cycle V" }))}>Cycle V</li></>
          }
        </ul>
      </div>
      <div className="prebuilt-decks-dropdown__button">
        {prebuiltDeckParameters.variant ? prebuiltDeckParameters.variant : "Variant"}
        <ul className="prebuilt-decks-dropdown">
          {prebuiltDeckParameters.type === "primordial" &&
            <><li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, variant: "ai" }))}>AI</li>
              <li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, variant: "bp" }))}>BP</li></>
          }
          {prebuiltDeckParameters.type === "exploration" &&
            <><li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, variant: "0" }))}>Acclimation 0</li>
              <li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, variant: "1" }))}>Acclimation 1</li>
              <li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, variant: "2" }))}>Acclimation 2</li>
              <li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, variant: "3" }))}>Acclimation 3</li>
              <li onClick={() => setPrebuilDeckParameters(prev => ({ ...prev, variant: "all" }))}>All</li></>
          }
        </ul>
      </div>
    </div>
  )
}

export default PrebuiltDecksBuilder;