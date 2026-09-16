import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import AppText from './AppText';

type Tint = 'brand' | 'amber' | 'blue';

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
  const bg = tint === 'amber' ? colors.amberSoft : tint === 'blue' ? colors.blueSoft : colors.brandSoft;
  const fg = tint === 'amber' ? colors.amber : tint === 'blue' ? colors.blue : colors.brandInk;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth,
        borderColor: colors.card,
      }}
    >
      <AppText weight="semibold" size={fontSize ?? size * 0.34} color={fg}>
        {initials}
      </AppText>
    </View>
  );
}
