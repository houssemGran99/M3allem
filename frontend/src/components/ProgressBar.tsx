import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function ProgressBar({ pct, color }: { pct: number; color?: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ height: 5, borderRadius: 3, backgroundColor: colors.line, overflow: 'hidden' }}>
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: color ?? colors.amber, borderRadius: 3 }} />
    </View>
  );
}
