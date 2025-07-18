import GearCard from "../components/cardtypes/GearCard/GearCard";
import ArgonautCard from "../components/cardtypes/ArgonautCard/ArgonautCard";
import PatternCard from "../components/cardtypes/PatternCard/PatternCard";
import TitanCard from "../components/cardtypes/TitanCard/TitanCard";
import AttackCard from "../components/cardtypes/AttackCard/AttackCard";
import ProductionFacilityCard from "../components/cardtypes/TechnologyCards/ProductionFacilityCard";
import BPCard from "../components/cardtypes/BPCard/BPCard";
import ClueCard from "../components/cardtypes/ClueCard/ClueCard";
import ExplorationCard from "../components/cardtypes/ExplorationCard/ExplorationCard";
import StructuralCard from "../components/cardtypes/TechnologyCards/StructuralCard";
import FatedMnemosCard from "../components/cardtypes/FatedMnemosCard/FatedMnemosCard";
import MnemosCard from "../components/cardtypes/MnemosCard/MnemosCard";

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
      "Structural": <StructuralCard key={name.cardIDs[0]} structural={name} />,
    }

    return techType[name.techType] || <></>;
  },
  "BP": (name) => <BPCard key={name.cardIDs[0]} bp={name} />,
  "Clue": (name) => <ClueCard key={name.cardIDs[0]} clue={name} />,
  "Exploration": (name) => <ExplorationCard key={name.cardIDs[0]} exploration={name} />,
  "Fated Mnemos": (name) => <FatedMnemosCard key={name.cardIDs[0]} fatedMnemos={name} />,
  "Mnemos": (name) => <MnemosCard key={name.cardIDs[0]} mnemos={name} />,
};

export default cardTypes;