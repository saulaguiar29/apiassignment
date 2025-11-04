import React from "react";
import { View, StyleSheet, FlatList, Alert, Pressable } from "react-native";
import { Text, Card } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LoadingSpinner from "../components/LoadingSpinner";
import { usePokemonTypes } from "../hooks/usePokemon";
import { TypeInfo } from "../types/pokemon";
import {
  getTypeColor,
  getContrastTextColor,
  capitalizeFirstLetter,
} from "../utils/pokemonHelpers";

export default function TypesScreen() {
  const { types, loading } = usePokemonTypes();
  const insets = useSafeAreaInsets();

  const handleTypePress = (typeName: string) => {
    Alert.alert(
      capitalizeFirstLetter(typeName) + " Type",
      `You selected ${typeName} type Pokémon!\n\nThis would show all ${typeName} type Pokémon in a full implementation.`
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading types..." />;
  }

  const renderTypeCard = ({ item }: { item: TypeInfo }) => {
    const backgroundColor = getTypeColor(item.name);
    const textColor = getContrastTextColor(backgroundColor);

    return (
      <Pressable
        onPress={() => handleTypePress(item.name)}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      >
        <Card style={[styles.typeCard, { backgroundColor }]} elevation={4}>
          <Card.Content style={styles.cardContent}>
            <Text
              variant="titleLarge"
              style={[styles.typeName, { color: textColor }]}
            >
              {capitalizeFirstLetter(item.name)}
            </Text>
          </Card.Content>
        </Card>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.headerText}>
          Tap a type to see all Pokémon of that type
        </Text>
      </View>

      <FlatList
        data={types}
        keyExtractor={(item) => item.name}
        renderItem={renderTypeCard}
        numColumns={2}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 20 },
        ]}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerText: {
    textAlign: "center",
    color: "#7f8c8d",
  },
  list: {
    padding: 8,
  },
  row: {
    justifyContent: "space-between",
  },
  typeCard: {
    flex: 1,
    margin: 8,
    minHeight: 100,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  typeName: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
