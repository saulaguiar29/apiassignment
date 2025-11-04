// API service for fetching Pokemon data from PokeAPI

import {
  PokemonListResponse,
  PokemonDetail,
  TypesResponse,
} from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Fetch a list of Pokemon
 * @param limit - Number of Pokemon to fetch (default: 50)
 * @param offset - Starting position (default: 0)
 */
export async function fetchPokemonList(
  limit: number = 50,
  offset: number = 0
): Promise<PokemonListResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
}

/**
 * Fetch detailed information about a specific Pokemon
 * @param nameOrId - Pokemon name or ID
 */
export async function fetchPokemonDetail(
  nameOrId: string | number
): Promise<PokemonDetail> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon detail:", error);
    throw error;
  }
}

/**
 * Fetch all Pokemon types
 */
export async function fetchPokemonTypes(): Promise<TypesResponse> {
  try {
    const response = await fetch(`${BASE_URL}/type`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon types:", error);
    throw error;
  }
}

/**
 * Fetch Pokemon by type
 * @param typeName - Type name (e.g., 'fire', 'water', 'grass')
 */
export async function fetchPokemonByType(typeName: string): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/type/${typeName}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon by type:", error);
    throw error;
  }
}

export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2]);
}
