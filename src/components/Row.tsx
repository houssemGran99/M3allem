import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';

export function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: ViewStyle | ViewStyle[] }) {
  const { isRTL } = useLanguage();
  return (
    <View style={[{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap }, style]}>{children}</View>
  );
}

export function Between({ children, style }: { children: React.ReactNode; style?: ViewStyle | ViewStyle[] }) {
  const { isRTL } = useLanguage();
  return (
    <View
      style={[
        { flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
        style,
      ]}
    >
      {children}
    </View>
  );
}
