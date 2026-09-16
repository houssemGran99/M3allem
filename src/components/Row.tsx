import React from 'react';
import { View, ViewStyle } from 'react-native';

export function Row({ children, gap = 8, style }: { children: React.ReactNode; gap?: number; style?: ViewStyle | ViewStyle[] }) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center', gap }, style]}>{children}</View>;
}

export function Between({ children, style }: { children: React.ReactNode; style?: ViewStyle | ViewStyle[] }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }, style]}>
      {children}
    </View>
  );
}
