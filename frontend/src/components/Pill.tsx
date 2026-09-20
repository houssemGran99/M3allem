import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import AppText from './AppText';

export type PillTone = 'g' | 'a' | 'r' | 'b';

const toneKey: Record<PillTone, { bg: keyof ReturnType<typeof useTheme>['colors']; fg: keyof ReturnType<typeof useTheme>['colors'] }> = {
  g: { bg: 'brandSoft', fg: 'brandInk' },
  a: { bg: 'amberSoft', fg: 'amber' },
  r: { bg: 'redSoft', fg: 'red' },
  b: { bg: 'blueSoft', fg: 'blue' },
};

export default function Pill({ label, tone = 'g' }: { label: string; tone?: PillTone }) {
  const { colors } = useTheme();
  const t = toneKey[tone];
  return (
    <View
      style={{
        backgroundColor: colors[t.bg],
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 7,
        alignSelf: 'flex-start',
      }}
    >
      <AppText size={10.5} weight="semibold" color={colors[t.fg]}>
        {label}
      </AppText>
    </View>
  );
}
