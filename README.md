# PokeDex

## Features

- Browse a list of 151 Generation 1 Pokémon
- Search for Pokémon by name
- View detailed information about each Pokémon including:
  - Types
  - Base stats
  - Height and weight
  - Abilities
- Browse all Pokémon types
- Professional UI with React Native Paper
- Loading states for better UX

## API Integration

This app uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data:

- **API Call 1:** `fetchPokemonList()` - Retrieves a collection of Pokémon (151 Pokémon from Generation 1)
- **API Call 2:** `fetchPokemonDetail()` - Retrieves detailed information about a specific Pokémon
- **API Call 3:** `fetchPokemonTypes()` - Retrieves all available Pokémon types

## Human Interface Guidelines Implementation

### Visual Clarity and Hierarchy

The application implements several key HIG principles to ensure an intuitive and accessible user experience. First, visual hierarchy is carefully established through typography and spacing. The app uses React Native Paper's Material Design 3 typography system, which provides consistent heading sizes (titleLarge, titleMedium, headlineMedium) and body text that guide users' attention to the most important information first. On the detail screen, the Pokémon's name is displayed prominently in a larger, bold font, followed by its ID number in a more subdued color (#7f8c8d), establishing clear information priority. Cards with elevation are used throughout to create depth and separate content sections, making it immediately clear which elements are interactive and how information is grouped.

### Color and Accessibility

The color scheme adheres to HIG principles of contrast and accessibility. Each Pokémon type has an official color that's been carefully selected to be both recognizable and accessible. The `getContrastTextColor()` function automatically calculates the appropriate text color (black or white) based on the background color's luminance, ensuring all text meets WCAG contrast requirements for readability. The primary color (#e74c3c - Pokémon Red) is used consistently for interactive elements like the FAB button and headers, creating a cohesive visual language. Additionally, the stats bars use a color-coded system (green for high stats, orange for medium, blue for low-medium, and red for low) that provides immediate visual feedback about a Pokémon's strengths, while still including numerical values for users who may have color vision deficiencies.

### Feedback and Responsiveness

The app prioritizes user feedback and responsive interactions throughout the experience. Loading states are implemented on every screen using the custom LoadingSpinner component, ensuring users always know when the app is fetching data. Interactive elements use React Native's Pressable component with opacity feedback (`opacity: pressed ? 0.7 : 1`), providing immediate visual confirmation when a card or button is tapped. The search functionality updates instantly as users type, with no delay or need to press a search button, following the HIG principle of immediate feedback. Navigation is handled through Expo Router with clear, descriptive titles in the navigation bar, and the FAB (Floating Action Button) for accessing types is positioned in the bottom-right corner following standard mobile patterns for thumb-friendly interaction. Error handling is also built in with Alert dialogs that explain what went wrong and suggest next steps, ensuring users are never left confused about the app's state.

## API

- Pokémon data from [PokéAPI](https://pokeapi.co/)
- Pokémon sprites from [PokeAPI/sprites](https://github.com/PokeAPI/sprites)
