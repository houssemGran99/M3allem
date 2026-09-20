import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { ColorScheme, dark, light } from './colors';
import { fontFamily, fontFamilyAr, fontSize, radii, shadow, spacing } from './tokens';

type ThemeContextValue = {
  colors: ColorScheme;
  isDark: boolean;
  radii: typeof radii;
  spacing: typeof spacing;
  fontSize: typeof fontSize;
  fontFamily: typeof fontFamily;
  fontFamilyAr: typeof fontFamilyAr;
  shadow: typeof shadow;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: isDark ? dark : light,
      isDark,
      radii,
      spacing,
      fontSize,
      fontFamily,
      fontFamilyAr,
      shadow,
    }),
    [isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
