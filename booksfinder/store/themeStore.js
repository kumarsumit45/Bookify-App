import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEMES } from "../constants/colors";

export const useThemeStore = create((set) => ({
  currentTheme: "OCEAN", // Default theme
  colors: THEMES.OCEAN.colors,

  // Load theme from storage
  loadTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme && THEMES[savedTheme]) {
        set({
          currentTheme: savedTheme,
          colors: THEMES[savedTheme].colors,
        });
      }
    } catch (error) {
      console.log("Failed to load theme:", error);
    }
  },

  // Change theme
  setTheme: async (themeName) => {
    try {
      if (THEMES[themeName]) {
        await AsyncStorage.setItem("theme", themeName);
        set({
          currentTheme: themeName,
          colors: THEMES[themeName].colors,
        });
      }
    } catch (error) {
      console.log("Failed to save theme:", error);
    }
  },
}));
