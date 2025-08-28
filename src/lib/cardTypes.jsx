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
import ArgoAbilityCard from "../components/cardtypes/TechnologyCards/ArgoAbilityCard";
import GodformCard from "../components/cardtypes/GodformCard/GodformCard";
import KratosCard from "../components/cardtypes/KratosCard/KratosCard";
import MoirosCard from "../components/cardtypes/MoirosCard/MoirosCard";
import NymphCard from "../components/cardtypes/NymphCard/NymphCard";
import ConditionCard from "../components/cardtypes/ConditionCard/ConditionCard";
import TraumaCard from "../components/cardtypes/TraumaCard/TraumaCard";
import TraitCard from "../components/cardtypes/TraitCard/TraitCard";
import StoryCard from "../components/cardtypes/StoryCard/StoryCard";
import DoomCard from "../components/cardtypes/DoomCard/DoomCard";
import TerrainCard from "../components/cardtypes/TerrainCard/TerrainCard";
import PrimordialCard from "../components/cardtypes/PrimordialCard/PrimordialCard";

const cardTypes = {
  "Argonaut": (name) => <ArgonautCard key={name.cardIDs} argonaut={name} />,
  "Gear": (name, currentSide = 1) => <GearCard key={name.cardIDs[0]} gear={name} currentSide={currentSide}/>,
  "Pattern": (name) => <PatternCard key={name.cardIDs[0]} pattern={name} />,
  "Titan": (name) => <TitanCard key={name.cardIDs[0]} titan={name} />,
  "Attack": (name) => <AttackCard key={name.cardIDs[0]} attack={name} />,
  "Technology": (name, currentSide = 1) => {
    const techSubType = {
      "Production Facility": <ProductionFacilityCard key={name.cardIDs[0]} productionFacility={name} currentSide={currentSide} />,
      "Argo Ability": <ArgoAbilityCard key={name.cardIDs[0]} argoAbility={name} currentSide={currentSide} />,
      //"Core": <ProductionFacilityCard key={name.cardIDs[0]} productionFacility={name} />,
    }
    const techType = {
      "Combat": techSubType[name.techSubType] || <></>,
      "Structural": <StructuralCard key={name.cardIDs[0]} structural={name} currentSide={currentSide} />,
    }

    return techType[name.techType] || <></>;
  },
  "BP": (name) => <BPCard key={name.cardIDs[0]} bp={name} />,
  "Clue": (name) => <ClueCard key={name.cardIDs[0]} clue={name} />,
  "Exploration": (name) => <ExplorationCard key={name.cardIDs[0]} exploration={name} />,
  "Fated Mnemos": (name) => <FatedMnemosCard key={name.cardIDs[0]} fatedMnemos={name} />,
  "Mnemos": (name) => <MnemosCard key={name.cardIDs[0]} mnemos={name} />,
  "Godform": (name) => <GodformCard key={name.cardIDs[0]} godform={name} />,
  "Kratos": (name) => <KratosCard key={name.cardIDs[0]} kratos={name} />,
  "Moiros": (name) => <MoirosCard key={name.cardIDs[0]} moiros={name} />,
  "Nymph": (name) => <NymphCard key={name.cardIDs[0]} nymph={name} />,
  "Condition": (name, currentSide = 1) => <ConditionCard key={name.cardIDs[0]} condition={name} currentSide={currentSide}/>,
  "Trauma": (name) => <TraumaCard key={name.cardIDs[0]} trauma={name} />,
  "Trait": (name) => <TraitCard key={name.cardIDs[0]} trait={name} />,
  "Story": (name, currentSide = 1) => <StoryCard key={name.cardIDs[0]} story={name} currentSide={currentSide} />,
  "Doom": (name, currentSide = 1) => <DoomCard key={name.cardIDs[0]} doom={name} currentSide={currentSide} />,
  "Terrain": (name, currentSide = 1) => <TerrainCard key={name.cardIDs[0]} terrain={name} currentSide={currentSide} />,
  "Primordial": (name) => <PrimordialCard key={name.cardIDs[0]} primordial={name} />,
};

export default cardTypes;