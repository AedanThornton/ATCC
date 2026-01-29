import Tippy from "@tippyjs/react";

// Import all SVG files dynamically
const modules = import.meta.glob("/src/assets/icons/*.svg", { eager: true });

const icons = {};

// Process and store each icon
for (const path in modules) {
  const key = path.split("/").pop().replace(".svg", ""); // Extract filename
  icons[key] = modules[path].default;
}

const nonInvertibles = new Set([
  "Reveal", "RedPowerDie", "RedArmorDie", "BlackPowerDie", "BlackArmorDie", "WhitePowerDie", "WhiteArmorDie", "MortalPowerDie", "MortalArmorDie",
  "Doom", "WoO", "PriorityTarget", "ToHit", "InvertedDoom", "InvertedProgress"
]);

// Utility functions
const getIcon = ({ name, type = "none", index, size = "1em" }) => {
  const sizeMultiplier = {
    "1 Hand": 0.9,
    "2 Hands": 1.1,
    "3 Hands": 1.2,
    "Armor": 0.9
  };

  // Special case name mapping
  const nameMap = {
    "Red": type === "Power" ? "RedPowerDie" : type === "Armor" ? "RedArmorDie" : "Red",
    "Black": type === "Power" ? "BlackPowerDie" : type === "Armor" ? "BlackArmorDie" : "Black",
    "White": type === "Power" ? "WhitePowerDie" : type === "Armor" ? "WhiteArmorDie" : "White",
    "Mortal": type === "Power" ? "MortalPowerDie" : type === "Armor" ? "MortalArmorDie" : "Mortal",
    "Reroll": type === "Armor" ? "EvasionReroll" : "PowerReroll",
    "1 Hand": "OneHanded",
    "2 Hands": "TwoHanded",
    "3 Hands": "ThreeHanded",
    "2 1 Hands": "TwoOneHanded",
    "3 1 Hands": "ThreeOneHanded",
    "AdversaryActivation": "Adversary",
    "Labyrinth": "Labyrinthians"
  };

  if (nameMap[name]) {
    name = nameMap[name];
    size = `${parseFloat(size) * (sizeMultiplier[name] || 1)}em`;
  }

  let wide = 1
  if (name === "ComplicatedAction" || name === "PrimordialZoneMarker") { wide = 2 }

  const icon = icons[name];
  return icon ? (
    <Tippy
      key={name + index}
      duration={0}
      offset={[-10, 5]}
      appendTo={document.body}
      placement="right-start"
      content={
        <span style={{ backgroundColor: "gray", color: "white", padding: "2px 3px", borderRadius: "5px", fontSize: "12px" }}>
          {name}
        </span>}
    >
      <img
        src={icon}
        style={{ height: size, maxWidth: `${parseFloat(size) * (wide)}em` }}
        alt={name}
        className={`text-icon ${nonInvertibles.has(name) ? "" : "invertible"} ${name}`}
      />
    </Tippy>
  ) : name;
}

export default getIcon;
