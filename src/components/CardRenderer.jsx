import React from "react";
import { Link } from "react-router-dom";

import GearCard from "./cardtypes/GearCard/GearCard";
import ArgonautCard from "./cardtypes/ArgonautCard/ArgonautCard";
import PatternCard from "./cardtypes/PatternCard/PatternCard";
import TitanCard from "./cardtypes/TitanCard/TitanCard";
import AttackCard from "./cardtypes/AttackCard/AttackCard";
import ProductionFacilityCard from "./cardtypes/ProductionFacilityCard/ProductionFacilityCard";
import BPCard from "./cardtypes/BPCard/BPCard";

const CardRenderer = ({cardname}) => {  
  const cardTypes = {
    "Argonaut": (name) => <ArgonautCard key={name.cardIDs} argonaut={name} />,
    "Gear": (name) => <GearCard key={name.cardIDs[0]} gear={name} />,
    "Pattern": (name) => <PatternCard key={name.cardIDs[0]} pattern={name} />,
    "Titan": (name) => <TitanCard key={name.cardIDs[0]} titan={name} />,
    "Attack": (name) => <AttackCard key={name.cardIDs[0]} attack={name} />,
    "Technology": (name) => {
      const techSubType = {
        "Production Facility": <ProductionFacilityCard key={name.cardIDs[0]} productionFacility={name} />,
        //"Argo Ability": <ArgoAbilityCard key={name.cardIDs[0]} productionFacility={name} />,
        //"Core": <ProductionFacilityCard key={name.cardIDs[0]} productionFacility={name} />,
      }
      const techType = {
        "Combat": techSubType[name.techSubType] || <></>,
        //"Structural": <ProductionFacilityCard key={name.cardIDs[0]} productionFacility={name} />,
      }

      return techType[name.techType] || <></>;
    },
    "BP": (name) => <BPCard key={name.cardIDs[0]} bp={name} />,
  };

  const currentCard = cardTypes[cardname.cardType]?.(cardname) || null;
  const secretOverlay = <>{
    (cardname.foundIn?.includes("Secret Deck") || cardname.foundIn?.includes("Envelope"))
    && <SecretOverlay text={cardname.foundIn} key={index + "cover"} />
  }</>

  return (
    <div style={{ position: "relative" }}>
      {secretOverlay}
      <Link to={`/card/${cardname.cardIDs[0]}`}>
        {currentCard}
        <div className="card-type-marker">
          {cardname.cardType}
        </div>
      </Link>
    </div>
  )
};

export default CardRenderer;