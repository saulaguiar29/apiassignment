import { Stack } from "expo-router";
import { PaperProvider, MD3LightTheme } from "react-native-paper";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#e74c3c",
    secondary: "#3498db",
    background: "#f8f9fa",
    surface: "#ffffff",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#e74c3c",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "PokéDex",
          }}
        />
        <Stack.Screen
          name="pokemon/[id]"
          options={{
            title: "Pokémon Details",
          }}
        />
        <Stack.Screen
          name="types"
          options={{
            title: "Pokémon Types",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
