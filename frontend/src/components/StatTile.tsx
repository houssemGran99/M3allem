import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import AppText from './AppText';

export default function StatTile({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  const { colors, radii } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.sub, borderRadius: radii.card, padding: 10, alignItems: 'center' }}>
      <AppText weight="bold" size={15} color={valueColor ?? colors.ink}>
        {value}
      </AppText>
      <AppText size={11} color={colors.ink2} style={{ marginTop: 2 }}>
        {label}
      </AppText>
    </View>
  );
}
