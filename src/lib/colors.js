// Helper functions for styling
export function getCyclePrimaryColor(cycle) {
  const cycleColors = {
    "Cycle I": "#270F03", /* 4A3204 */
    "Tutorial": "#270F03", /* 4A3204 */
    "Cycle II": "rgb(77, 18, 11)",
    "Cycle III": "#271a2bff",
    "Cycle IV": "#131004",
    "Cycle V": "#19232fff",
    "Mnestis Theatre": "#a07800",
    "Mnestis": "#a07800",
    
    "Adversary": "#FFFFFF",
  };
  return cycleColors[cycle] || "#FFFFFF";
};

export function getCycleSecondaryColor(cycle) {
  const cycleColors = {
    "Cycle I": "#743e27",
    "Tutorial": "#743e27",
    "Cycle II": "rgba(138, 22, 9, 1)",
    "Cycle III": "#46364dff",
    "Cycle IV": "#cfb056ff",
    "Cycle V": "#354b6aff",
    "Mnestis Theatre": "#eab61a",
    "Mnestis": "#eab61a",

    "Adversary": "#ccc4bfff"
  };
  return cycleColors[cycle] || "#FFFFFF";
};

export function getCycleTextColor(cycle) {
  const cycleColors = {
    "Cycle I": "#FFFFFF",
    "Tutorial": "#FFFFFF",
    "Cycle II": "#FFFFFF",
    "Cycle III": "#FFFFFF",
    "Cycle IV": "#E7CC68",
    "Cycle V": "#FFFFFF",
    "Mnestis Theatre": "#FFFFFF",
    "Mnestis": "#FFFFFF",

    "Adversary": "#000000",
  };
  return cycleColors[cycle] || "#FFFFFF";
};

export function getGateColor(gatetype) {
  gatetype = gatetype.toLowerCase()
  const conditionColor = "#C09513"
  const gateColors = {
    hits: "rgb(155, 35, 21)",
    "full hit": "rgb(155, 35, 21)",
    danger: "rgb(155, 35, 21)",
    energy: "rgb(155, 35, 21)",
    fate: "#557DBD",
    rage: "#040404",
    ambrosia: "#5D0D69",
    bleed: "#040404",
    labyrinth: "#7D4921",
    despair: "#07302fff",
    "danger+fate": "linear-gradient(90deg, rgba(155,35,21,1) 38%, rgba(34,85,167,1) 62%)",
    midas: "#d4ae43ff",
    pain: "#707070ff",
    aether: "#071530ff",
    "any condition": conditionColor,
    bravery: conditionColor,
    "negative condition": conditionColor,
    "positive condition": conditionColor,
  };
  return gateColors[gatetype] || "#AAAAAA";
};

export const isAdversary = {
  "Hermesian Pursuer": 1,
  "The Burden": 1,
  "Dahaka": 1,
  "Titan X": 1
}

export const adversaryPrimaryColor = "#12222eff"
export const adversarySecondaryColor = "#4d6b80"