// Cinematic scene map - each scene is a full-screen "page" with its own color soul.
// Navigation between scenes plays the liquid-iris transition instead of scrolling.

export const SCENES = [
  {
    id: "home",
    numeral: "I",
    colors: ["#ff8fb2", "#ffd7a1", "#a78bfa"],
    aurora: ["rgba(255,143,178,0.32)", "rgba(255,215,161,0.26)", "rgba(167,139,250,0.24)"],
  },
  {
    id: "flavours",
    numeral: "II",
    colors: ["#e05297", "#ff8fb2", "#f472b6"],
    aurora: ["rgba(224,82,151,0.30)", "rgba(255,143,178,0.28)", "rgba(244,114,182,0.22)"],
  },
  {
    id: "inside",
    numeral: "III",
    colors: ["#a78bfa", "#67e8f9", "#c4b5fd"],
    aurora: ["rgba(167,139,250,0.32)", "rgba(103,232,249,0.24)", "rgba(196,181,253,0.26)"],
  },
  {
    id: "rituals",
    numeral: "IV",
    colors: ["#ffb347", "#ffd699", "#ff8fb2"],
    aurora: ["rgba(255,179,71,0.30)", "rgba(255,214,153,0.26)", "rgba(255,143,178,0.22)"],
  },
  {
    id: "society",
    numeral: "V",
    colors: ["#d9a441", "#f5c76a", "#5eead4"],
    aurora: ["rgba(217,164,65,0.30)", "rgba(245,199,106,0.26)", "rgba(94,234,212,0.20)"],
  },
  {
    id: "play",
    numeral: "VI",
    colors: ["#f472b6", "#a78bfa", "#67e8f9"],
    aurora: ["rgba(244,114,182,0.30)", "rgba(167,139,250,0.28)", "rgba(103,232,249,0.22)"],
  },
  {
    id: "voices",
    numeral: "VII",
    colors: ["#5eead4", "#67e8f9", "#ff8fb2"],
    aurora: ["rgba(94,234,212,0.28)", "rgba(103,232,249,0.26)", "rgba(255,143,178,0.22)"],
  },
];

export const SCENE_ORDER = SCENES.map((s) => s.id);

export function sceneIndex(id) {
  const i = SCENE_ORDER.indexOf(id);
  return i === -1 ? 0 : i;
}

export function getScene(id) {
  return SCENES[sceneIndex(id)];
}