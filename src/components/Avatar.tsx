import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import AppText from './AppText';
import { Tint } from '../types';

export default function Avatar({
  initials,
  tint = 'brand',
  size = 40,
  fontSize,
  borderWidth = 0,
}: {
  initials: string;
  tint?: Tint;
  size?: number;
  fontSize?: number;
  borderWidth?: number;
}) {
  const { colors } = useTheme();
  const bgMap: Record<Tint, string> = { amber: colors.amberSoft, blue: colors.blueSoft, ochre: colors.ochreSoft, brand: colors.brandSoft };
  const fgMap: Record<Tint, string> = { amber: colors.amber, blue: colors.blue, ochre: colors.ochre, brand: colors.brandInk };
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bgMap[tint],
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth,
        borderColor: colors.card,
      }}
    >
      <AppText weight="semibold" size={fontSize ?? size * 0.34} color={fgMap[tint]}>
        {initials}
      </AppText>
    </View>
  );
}
