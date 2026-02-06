import GearCard from "../components/rendertypes/GearCard/GearCard";
import ArgonautCard from "../components/rendertypes/ArgonautCard/ArgonautCard";
import PatternCard from "../components/rendertypes/PatternCard/PatternCard";
import TitanCard from "../components/rendertypes/TitanCard/TitanCard";
import AttackCard from "../components/rendertypes/AttackCard/AttackCard";
import ProductionFacilityCard from "../components/rendertypes/TechnologyCards/ProductionFacilityCard";
import BPCard from "../components/rendertypes/BPCard/BPCard";
import ClueCard from "../components/rendertypes/ClueCard/ClueCard";
import ExplorationCard from "../components/rendertypes/ExplorationCard/ExplorationCard";
import StructuralCard from "../components/rendertypes/TechnologyCards/StructuralCard";
import FatedMnemosCard from "../components/rendertypes/FatedMnemosCard/FatedMnemosCard";
import MnemosCard from "../components/rendertypes/MnemosCard/MnemosCard";
import ArgoAbilityCard from "../components/rendertypes/TechnologyCards/ArgoAbilityCard";
import GodformCard from "../components/rendertypes/GodformCard/GodformCard";
import KratosCard from "../components/rendertypes/KratosCard/KratosCard";
import MoirosCard from "../components/rendertypes/MoirosCard/MoirosCard";
import NymphCard from "../components/rendertypes/NymphCard/NymphCard";
import ConditionCard from "../components/rendertypes/ConditionCard/ConditionCard";
import TraumaCard from "../components/rendertypes/TraumaCard/TraumaCard";
import TraitCard from "../components/rendertypes/TraitCard/TraitCard";
import StoryCard from "../components/rendertypes/StoryCard/StoryCard";
import DoomCard from "../components/rendertypes/DoomCard/DoomCard";
import TerrainCard from "../components/rendertypes/TerrainCard/TerrainCard";
import PrimordialCard from "../components/rendertypes/PrimordialCard/PrimordialCard";
import MapCard from "../components/rendertypes/MapCard/MapCard";
import DahakaCard from "../components/rendertypes/DahakaCard/DahakaCard";
import PayloadCard from "../components/rendertypes/PayloadCard/PayloadCard";
import TraitLikeCard from "../components/rendertypes/TraitLikeCard/TraitLikeCard";

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
  "Trait": (name) => <TraitCard key={name.cardIDs[0]} trait={name} />,
  "Story": (name, currentSide = 1) => <StoryCard key={name.cardIDs[0]} story={name} currentSide={currentSide} />,
  "Doom": (name, currentSide = 1) => <DoomCard key={name.cardIDs[0]} doom={name} currentSide={currentSide} />,
  "Terrain": (name, currentSide = 1) => <TerrainCard key={name.cardIDs[0]} terrain={name} currentSide={currentSide} />,
  "Primordial": (name) => <PrimordialCard key={name.cardIDs[0]} primordial={name} />,
  "Map": (name) => <MapCard key={name.cardIDs[0]} map={name} />,
  "AI | BP": (name) => <DahakaCard key={name.cardIDs[0]} dahaka={name} />,
  "Sig | Rout": (name) => <DahakaCard key={name.cardIDs[0]} dahaka={name} />,
  "Payload": (name) => <PayloadCard key={name.cardIDs[0]} payload={name} />,
  "Trait-like": (name) => <TraitLikeCard key={name.cardIDs[0]} traitlike={name} />,
};

export default renderTypes;