import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  name: React.ComponentProps<typeof Feather>['name'];
  onPress?: () => void;
  size?: number;
  color?: string;
  bg?: string;
  borderColor?: string;
  style?: ViewStyle | ViewStyle[];
};

export default function IconButton({ name, onPress, size = 40, color, bg, borderColor, style }: Props) {
  const { colors, radii } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius: radii.control + (size > 36 ? 2 : 0),
          borderWidth: 1,
          borderColor: borderColor ?? colors.line,
          backgroundColor: bg ?? colors.card,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Feather name={name} size={size * 0.45} color={color ?? colors.ink2} />
    </TouchableOpacity>
  );
}
