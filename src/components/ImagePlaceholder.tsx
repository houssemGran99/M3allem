import React from 'react';
import { DimensionValue, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function ImagePlaceholder({
  width = '100%',
  height = 80,
  radius,
  dashed,
  icon,
}: {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
  dashed?: boolean;
  icon?: React.ComponentProps<typeof Feather>['name'];
}) {
  const { colors, radii } = useTheme();
  return (
    <View
      style={{
        width,
        height,
        borderRadius: radius ?? radii.control,
        backgroundColor: dashed ? 'transparent' : colors.sub,
        borderWidth: dashed ? 1.5 : 0,
        borderColor: colors.line,
        borderStyle: dashed ? 'dashed' : 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {icon && <Feather name={icon} size={18} color={colors.ink3} />}
    </View>
  );
}
