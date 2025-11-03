import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import {
  getTypeColor,
  getContrastTextColor,
  capitalizeFirstLetter,
} from "../utils/pokemonHelpers";

interface TypeBadgeProps {
  type: string;
  size?: "small" | "medium" | "large";
}

export default function TypeBadge({ type, size = "medium" }: TypeBadgeProps) {
  const backgroundColor = getTypeColor(type);
  const textColor = getContrastTextColor(backgroundColor);

  const sizeStyles = {
    small: { paddingHorizontal: 8, paddingVertical: 4 },
    medium: { paddingHorizontal: 12, paddingVertical: 6 },
    large: { paddingHorizontal: 16, paddingVertical: 8 },
  };

  const textSizes = {
    small: "bodySmall",
    medium: "bodyMedium",
    large: "bodyLarge",
  };

  return (
    <View style={[styles.badge, { backgroundColor }, sizeStyles[size]]}>
      <Text
        variant={textSizes[size] as any}
        style={[styles.text, { color: textColor }]}
      >
        {capitalizeFirstLetter(type)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    alignSelf: "flex-start",
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontWeight: "600",
  },
});
