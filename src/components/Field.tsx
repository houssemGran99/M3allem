import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import AppText from './AppText';

export default function Field({
  icon,
  placeholder,
  value,
}: {
  icon?: React.ComponentProps<typeof Feather>['name'];
  placeholder: string;
  value?: string;
}) {
  const { colors, radii } = useTheme();
  return (
    <View
      style={{
        height: 42,
        borderRadius: radii.control + 2,
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: colors.sub,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
      }}
    >
      {icon && <Feather name={icon} size={15} color={colors.ink3} />}
      <AppText size={13} color={value ? colors.ink : colors.ink3}>
        {value ?? placeholder}
      </AppText>
    </View>
  );
}
