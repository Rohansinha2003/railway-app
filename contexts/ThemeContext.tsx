import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Colors } from '@/constants/theme';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: typeof Colors.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await SecureStore.getItemAsync('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Use system preference if no saved preference
        setIsDarkMode(systemColorScheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      // Fallback to system preference
      setIsDarkMode(systemColorScheme === 'dark');
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await SecureStore.setItemAsync('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const colors = isDarkMode ? Colors.dark : Colors.light;

  const value = {
    isDarkMode,
    toggleTheme,
    colors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
