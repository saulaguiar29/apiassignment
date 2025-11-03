import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Searchbar, FAB } from "react-native-paper";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PokemonCard from "../components/PokemonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchPokemonList } from "../services/pokemonApi";
import { Pokemon } from "../types/pokemon";

export default function Index() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      // Fetch first 151 Pokemon (Gen 1)
      const data = await fetchPokemonList(151, 0);
      setPokemonList(data.results);
      setFilteredList(data.results);
    } catch (error) {
      console.error("Error loading Pokemon:", error);
      Alert.alert(
        "Error",
        "Failed to load Pokémon. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredList(pokemonList);
    } else {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredList(filtered);
    }
  };

  const handlePokemonPress = (pokemon: Pokemon) => {
    const id = pokemon.url.split("/").slice(-2)[0];
    // Navigate to the Pokémon detail page by interpolating the id into the path
    router.push(`/pokemon/${id}`);
  };

  if (loading) {
    return <LoadingSpinner message="Loading Pokémon..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search Pokémon"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => handlePokemonPress(item)}
          />
        )}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        icon="filter-variant"
        label="Types"
        style={[styles.fab, { bottom: insets.bottom + 16 }]}
        onPress={() => router.push("/types")}
        color="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchbar: {
    elevation: 0,
    backgroundColor: "#f5f5f5",
  },
  list: {
    paddingTop: 8,
  },
  fab: {
    position: "absolute",
    right: 16,
    backgroundColor: "#e74c3c",
  },
});
