import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ColorScheme, dark, light } from './colors';
import { fontFamily, fontSize, radii, shadow, spacing } from './tokens';

export type Role = 'client' | 'worker';

type ThemeContextValue = {
  colors: ColorScheme;
  isDark: boolean;
  radii: typeof radii;
  spacing: typeof spacing;
  fontSize: typeof fontSize;
  fontFamily: typeof fontFamily;
  shadow: typeof shadow;
  role: Role;
  setRole: (role: Role) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const [role, setRole] = useState<Role>('client');

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: isDark ? dark : light,
      isDark,
      radii,
      spacing,
      fontSize,
      fontFamily,
      shadow,
      role,
      setRole,
    }),
    [isDark, role]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
