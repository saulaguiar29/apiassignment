// Pokemon type colors for badges and UI elements
// Based on official Pokemon type colors

export const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

/**
 * Get color for a Pokemon type
 * @param type - Type name (e.g., 'fire', 'water')
 * @returns Hex color code
 */
export function getTypeColor(type: string): string {
  return TYPE_COLORS[type.toLowerCase()] || "#68A090"; // Default teal if type not found
}

/**
 * Get text color (black or white) based on background color for readability
 * @param backgroundColor - Hex color code
 * @returns 'white' or 'black'
 */
export function getContrastTextColor(
  backgroundColor: string
): "white" | "black" {
  // Convert hex to RGB
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? "black" : "white";
}

/**
 * Capitalize first letter of a string
 * @param str - String to capitalize
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format Pokemon name (replace hyphens with spaces, capitalize)
 * @param name - Pokemon name from API
 */
export function formatPokemonName(name: string): string {
  return name
    .split("-")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

/**
 * Format stat name for display
 * @param statName - Stat name from API
 */
export function formatStatName(statName: string): string {
  const statNames: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  return statNames[statName] || capitalizeFirstLetter(statName);
}
