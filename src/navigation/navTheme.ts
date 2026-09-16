import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { ColorScheme } from '../theme/colors';

export function buildNavTheme(colors: ColorScheme, isDark: boolean): Theme {
  const base = isDark ? DarkTheme : DefaultTheme;
  return {
    ...base,
    dark: isDark,
    colors: {
      ...base.colors,
      primary: colors.brand,
      background: colors.page,
      card: colors.card,
      text: colors.ink,
      border: colors.line,
      notification: colors.red,
    },
  };
}
