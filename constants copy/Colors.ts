/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    background: "#FFFFFF", // Pure White background
    primary: "#1E3A8A", // Dark Blue (primary buttons/icons)
    secondary: "#34D399", // Soft Green (secondary icons/buttons)
    textPrimary: "#212121", // Dark Gray text (primary text)
    textSecondary: "#616161", // Medium Gray text (secondary text)
    border: "#E0E0E0",
  },
  dark: {
    text: "#ECEDEE",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    background: "#121212", // Near-Black background
    primary: "#2563EB", // Dark Blue (primary buttons/icons)
    secondary: "#10B981", // Muted Green (secondary icons/buttons)
    textPrimary: "#FFFFFF", // White text (primary text)
    textSecondary: "#BDBDBD", // Light Gray text (secondary text)
    border: "#333333",
  },
};
