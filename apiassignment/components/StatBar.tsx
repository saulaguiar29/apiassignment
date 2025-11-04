import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { formatStatName } from "../utils/pokemonHelpers";

interface StatBarProps {
  statName: string;
  value: number;
  maxValue?: number;
}

export default function StatBar({
  statName,
  value,
  maxValue = 255,
}: StatBarProps) {
  const percentage = (value / maxValue) * 100;

  const getBarColor = () => {
    if (value >= 150) return "#27ae60";
    if (value >= 100) return "#f39c12";
    if (value >= 50) return "#3498db";
    return "#e74c3c";
  };

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={styles.statName}>
        {formatStatName(statName)}
      </Text>
      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              {
                width: `${percentage}%`,
                backgroundColor: getBarColor(),
              },
            ]}
          />
        </View>
        <Text variant="bodyMedium" style={styles.statValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  statName: {
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 6,
    minWidth: 80,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  barBackground: {
    flex: 1,
    height: 20,
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 10,
  },
  statValue: {
    marginLeft: 12,
    fontWeight: "600",
    color: "#2c3e50",
    minWidth: 40,
    textAlign: "right",
  },
});
