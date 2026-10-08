import React from 'react';
import { ActivityIndicator, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import AppText from './AppText';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'md' | 'sm';
  style?: ViewStyle | ViewStyle[];
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  fullWidth = true,
  loading,
  disabled,
}: Props) {
  const { colors, radii } = useTheme();

  const bg =
    variant === 'primary' ? colors.brand : variant === 'danger' ? colors.red : 'transparent';
  const textColor = variant === 'ghost' ? colors.ink : '#FFFFFF';
  const borderColor = variant === 'ghost' ? colors.line : 'transparent';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          height: size === 'sm' ? 34 : 46,
          borderRadius: size === 'sm' ? radii.control : radii.button,
          backgroundColor: bg,
          borderWidth: 1,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: size === 'sm' ? 14 : 18,
          opacity: disabled ? 0.5 : 1,
          width: fullWidth ? '100%' : undefined,
          flexDirection: 'row',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <AppText weight="semibold" size={size === 'sm' ? 12.5 : 14} color={textColor}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}
