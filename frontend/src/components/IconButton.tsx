import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';

type Props = {
  name: React.ComponentProps<typeof Feather>['name'];
  onPress?: () => void;
  size?: number;
  color?: string;
  bg?: string;
  borderColor?: string;
  style?: ViewStyle | ViewStyle[];
};

const DIRECTIONAL_ICONS = new Set(['arrow-left', 'arrow-right', 'chevron-left', 'chevron-right', 'navigation', 'send']);

export default function IconButton({ name, onPress, size = 40, color, bg, borderColor, style }: Props) {
  const { colors, radii } = useTheme();
  const { isRTL } = useLanguage();
  const shouldMirror = isRTL && DIRECTIONAL_ICONS.has(name);
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
      <Feather
        name={name}
        size={size * 0.45}
        color={color ?? colors.ink2}
        style={shouldMirror ? { transform: [{ scaleX: -1 }] } : undefined}
      />
    </TouchableOpacity>
  );
}
