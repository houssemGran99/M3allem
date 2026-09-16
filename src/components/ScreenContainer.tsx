import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

export default function ScreenContainer({
  children,
  scroll = true,
  edges,
  contentStyle,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  contentStyle?: ViewStyle | ViewStyle[];
}) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={edges ?? ['top']}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[{ padding: 16, paddingBottom: 32 }, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
