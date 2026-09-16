import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

type Props = TextProps & {
  weight?: Weight;
  color?: string;
  size?: number;
  style?: TextStyle | TextStyle[];
};

export default function AppText({ weight = 'regular', color, size, style, ...rest }: Props) {
  const { colors, fontFamily } = useTheme();
  return (
    <Text
      {...rest}
      style={[
        { fontFamily: fontFamily[weight], color: color ?? colors.ink, fontSize: size ?? 15 },
        style,
      ]}
    />
  );
}
