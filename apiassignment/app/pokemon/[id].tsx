import React from "react";
import { View, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { Text, Card, Chip } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LoadingSpinner from "../../components/LoadingSpinner";
import TypeBadge from "../../components/TypeBadge";
import StatBar from "../../components/StatBar";
import { usePokemonDetail } from "../../hooks/usePokemon";
import { formatPokemonName } from "../../utils/pokemonHelpers";

const { width } = Dimensions.get("window");

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { pokemon, loading } = usePokemonDetail(id);
  const insets = useSafeAreaInsets();

  if (loading) {
    return <LoadingSpinner message="Loading Pokémon details..." />;
  }

  if (!pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="titleLarge">Pokémon not found</Text>
      </View>
    );
  }

  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: insets.bottom + 20 },
      ]}
    >
      {/* Header Section */}
      <Card style={styles.headerCard} elevation={4}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: imageUrl || undefined }}
            style={styles.mainImage}
            resizeMode="contain"
          />
          <View style={styles.headerInfo}>
            <Text variant="headlineMedium" style={styles.pokemonName}>
              {formatPokemonName(pokemon.name)}
            </Text>
            <Text variant="titleMedium" style={styles.pokemonId}>
              #{pokemon.id.toString().padStart(3, "0")}
            </Text>
          </View>
        </View>
      </Card>

      {/* Types Section */}
      <Card style={styles.section} elevation={2}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Types
          </Text>
          <View style={styles.typesContainer}>
            {pokemon.types.map((typeInfo) => (
              <TypeBadge
                key={typeInfo.type.name}
                type={typeInfo.type.name}
                size="large"
              />
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Physical Info Section */}
      <Card style={styles.section} elevation={2}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Physical Information
          </Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text variant="bodyLarge" style={styles.infoLabel}>
                Height
              </Text>
              <Text variant="headlineSmall" style={styles.infoValue}>
                {(pokemon.height / 10).toFixed(1)} m
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <Text variant="bodyLarge" style={styles.infoLabel}>
                Weight
              </Text>
              <Text variant="headlineSmall" style={styles.infoValue}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Stats Section */}
      <Card style={styles.section} elevation={2}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Base Stats
          </Text>
          <View style={styles.statsContainer}>
            {pokemon.stats.map((statInfo) => (
              <StatBar
                key={statInfo.stat.name}
                statName={statInfo.stat.name}
                value={statInfo.base_stat}
              />
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Abilities Section */}
      <Card style={styles.section} elevation={2}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Abilities
          </Text>
          <View style={styles.abilitiesContainer}>
            {pokemon.abilities.map((abilityInfo) => (
              <Chip
                key={abilityInfo.ability.name}
                mode="outlined"
                style={styles.abilityChip}
                textStyle={styles.abilityText}
              >
                {formatPokemonName(abilityInfo.ability.name)}
                {abilityInfo.is_hidden && " (Hidden)"}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerCard: {
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  headerContent: {
    alignItems: "center",
    padding: 20,
  },
  mainImage: {
    width: width * 0.6,
    height: width * 0.6,
    maxWidth: 300,
    maxHeight: 300,
  },
  headerInfo: {
    alignItems: "center",
    marginTop: 16,
  },
  pokemonName: {
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
  },
  pokemonId: {
    color: "#7f8c8d",
    marginTop: 4,
  },
  section: {
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: "#e0e0e0",
  },
  infoLabel: {
    color: "#7f8c8d",
    marginBottom: 8,
  },
  infoValue: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  statsContainer: {
    marginTop: 8,
  },
  abilitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  abilityChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  abilityText: {
    fontSize: 14,
  },
});
