import GearCard from "./GearCard/GearCard";
import ArgonautCard from "./ArgonautCard/ArgonautCard";
import PatternCard from "./PatternCard/PatternCard";
import TitanCard from "./TitanCard/TitanCard";
import AttackCard from "./AttackCard/AttackCard";
import ProductionFacilityCard from "./TechnologyCards/ProductionFacilityCard";
import BPCard from "./BPCard/BPCard";
import ClueCard from "./ClueCard/ClueCard";
import ExplorationCard from "./ExplorationCard/ExplorationCard";
import StructuralCard from "./TechnologyCards/StructuralCard";
import FatedMnemosCard from "./FatedMnemosCard/FatedMnemosCard";
import MnemosCard from "./MnemosCard/MnemosCard";
import ArgoAbilityCard from "./TechnologyCards/ArgoAbilityCard";
import GodformCard from "./GodformCard/GodformCard";
import KratosCard from "./KratosCard/KratosCard";
import MoirosCard from "./MoirosCard/MoirosCard";
import NymphCard from "./NymphCard/NymphCard";
import ConditionCard from "./ConditionCard/ConditionCard";
import TraumaCard from "./TraumaCard/TraumaCard";
import TraitCard from "./TraitCard/TraitCard";
import StoryCard from "./StoryCard/StoryCard";
import DoomCard from "./DoomCard/DoomCard";
import TerrainCard from "./TerrainCard/TerrainCard";
import PrimordialCard from "./PrimordialCard/PrimordialCard";
import MapCard from "./MapCard/MapCard";
import DahakaCard from "./DahakaCard/DahakaCard";
import PayloadCard from "./PayloadCard/PayloadCard";
import TraitLikeCard from "./TraitLikeCard/TraitLikeCard";

const renderTypes = {
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
  "Trait": (name, currentSide = 1) => <TraitCard key={name.cardIDs[0]} trait={name} currentSide={currentSide} />,
  "Story": (name, currentSide = 1) => <StoryCard key={name.cardIDs[0]} story={name} currentSide={currentSide} />,
  "Doom": (name, currentSide = 1) => <DoomCard key={name.cardIDs[0]} doom={name} currentSide={currentSide} />,
  "Terrain": (name, currentSide = 1) => <TerrainCard key={name.cardIDs[0]} terrain={name} currentSide={currentSide} />,
  "Primordial": (name) => <PrimordialCard key={name.cardIDs[0]} primordial={name} />,
  "Map": (name, currentSide = 1) => <MapCard key={name.cardIDs[0]} map={name} currentSide={currentSide} />,
  "AI | BP": (name) => <DahakaCard key={name.cardIDs[0]} dahaka={name} />,
  "Sig | Rout": (name) => <DahakaCard key={name.cardIDs[0]} dahaka={name} />,
  "Payload": (name) => <PayloadCard key={name.cardIDs[0]} payload={name} />,
  "Trait-like": (name, currentSide = 1) => <TraitLikeCard key={name.cardIDs[0]} traitlike={name} currentSide={currentSide} />,
};

export default renderTypes;