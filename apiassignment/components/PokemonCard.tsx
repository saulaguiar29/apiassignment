import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import { Pokemon } from "../types/pokemon";
import { getPokemonIdFromUrl } from "../services/pokemonApi";
import { formatPokemonName } from "../utils/pokemonHelpers";

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
}

export default function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      <Card style={styles.card} elevation={3}>
        <View style={styles.content}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.info}>
            <Text variant="bodySmall" style={styles.id}>
              #{pokemonId.toString().padStart(3, "0")}
            </Text>
            <Text variant="titleMedium" style={styles.name}>
              {formatPokemonName(pokemon.name)}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  image: {
    width: 70,
    height: 70,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  id: {
    color: "#888",
    marginBottom: 4,
  },
  name: {
    fontWeight: "600",
    color: "#2c3e50",
  },
});
