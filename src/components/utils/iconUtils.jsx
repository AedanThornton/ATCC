import React from "react";

// Import all SVG files dynamically
const modules = import.meta.glob("/src/assets/icons/*.svg", { eager: true });

const icons = {};

// Process and store each icon
for (const path in modules) {
    const key = path.split("/").pop().replace(".svg", ""); // Extract filename
    icons[key] = modules[path].default;
}

const invertibles = new Set([
    "Danger", "Fate", "Rage", "Exhaust", "Discard", "Reaction",
    "Gear", "OneHanded", "TwoHanded", "ThreeHanded",
    "Support", "Armor", "Speed", "Power", "Break", "Opening",
    "Pushback", "PowerReroll", "Reposition", "Vault", "Pole Position",
    "Motivate", "Tireless", "Diversion", "Hope", "Black", "Fire", "Closing",
    "Rouse", "Heartseeker", "Elation", "Overbreak", "Provoke", "d10", "AT",
    "CombatAction", "MovementAction", "ComplicatedAction", "CombatTech", 
    "StructuralTech", "Adversary", "AdventureHub", "TitanIcon", "City", "Lock",
    "ArgoFate"
]);

// Utility functions
const utils = {
    getIcon: (name, type = "none", index, size = "1em", padding = "0.1em") => {
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
            "Reroll": "PowerReroll",
            "1 Hand": "OneHanded",
            "2 Hands": "TwoHanded",
            "3 Hands": "ThreeHanded",
            "Armor": "Armor",
            "AdversaryActivation": "Adversary"
        };

        if (nameMap[name]) {
            name = nameMap[name];
            size = `${parseFloat(size) * (sizeMultiplier[name] || 1)}em`;
        }

        const icon = icons[name];
        return icon ? (
            <img 
                key={name + index} 
                src={icon} 
                style={{ height: size, maxWidth: size, verticalAlign: "middle", paddingBottom: padding }} 
                alt={name} 
                className={`${invertibles.has(name) ? "invertible" : ""} ${name}`}
            />
        ) : name;
    },

    interpolateIcons: (str, type) => {
        return str.split(/\b/).map((word, index) => utils.getIcon(word, type, index));
    }
};

const TextWithIcons = ({ text, type = "none" }) => <>{utils.interpolateIcons(text, type)}</>;


utils["inputIconUpdatedComponent"] = (text, type, index) => {
    return <TextWithIcons text={text} type={type} key={index} />;
};

export default utils;
