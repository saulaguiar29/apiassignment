import { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  fetchPokemonList,
  fetchPokemonDetail,
  fetchPokemonTypes,
} from "../services/pokemonApi";
import { Pokemon, PokemonDetail, TypeInfo } from "../types/pokemon";

export function usePokemonList(limit: number = 151, offset: number = 0) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonList(limit, offset);
      setPokemonList(data.results);
      setFilteredList(data.results);
    } catch (err) {
      console.error("Error loading Pokemon:", err);
      setError(
        "Failed to load Pokémon. Please check your internet connection."
      );
      Alert.alert(
        "Error",
        "Failed to load Pokémon. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = (query: string) => {
    if (query.trim() === "") {
      setFilteredList(pokemonList);
    } else {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredList(filtered);
    }
  };

  return {
    pokemonList,
    filteredList,
    loading,
    error,
    searchPokemon,
    reload: loadPokemon,
  };
}

export function usePokemonDetail(id: string | undefined) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPokemonDetail();
    }
  }, [id]);

  const loadPokemonDetail = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonDetail(id);
      setPokemon(data);
    } catch (err) {
      console.error("Error loading Pokemon detail:", err);
      setError("Failed to load Pokémon details.");
      Alert.alert("Error", "Failed to load Pokémon details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemon,
    loading,
    error,
    reload: loadPokemonDetail,
  };
}

export function usePokemonTypes() {
  const [types, setTypes] = useState<TypeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonTypes();
      const filteredTypes = data.results.filter(
        (type) => !["unknown", "shadow"].includes(type.name)
      );
      setTypes(filteredTypes);
    } catch (err) {
      console.error("Error loading types:", err);
      setError("Failed to load Pokémon types.");
      Alert.alert("Error", "Failed to load Pokémon types. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    types,
    loading,
    error,
    reload: loadTypes,
  };
}

export function useLoading(initialState: boolean = false) {
  const [loading, setLoading] = useState(initialState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const withLoading = async <T>(operation: () => Promise<T>): Promise<T> => {
    startLoading();
    try {
      return await operation();
    } finally {
      stopLoading();
    }
  };

  return {
    loading,
    startLoading,
    stopLoading,
    withLoading,
  };
}
