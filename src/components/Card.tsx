import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = ViewProps & {
  soft?: boolean;
  borderColor?: string;
  bg?: string;
  padding?: number;
  style?: ViewStyle | ViewStyle[];
};

export default function Card({ soft, borderColor, bg, padding = 12, style, children, ...rest }: Props) {
  const { colors, radii } = useTheme();
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: bg ?? (soft ? colors.sub : colors.card),
          borderRadius: radii.card,
          padding,
          borderWidth: soft ? 0 : 1,
          borderColor: borderColor ?? colors.line,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
