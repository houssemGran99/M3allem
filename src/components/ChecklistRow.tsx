import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import AppText from './AppText';

export default function ChecklistRow({
  label,
  done,
  onPress,
  isLast,
}: {
  label: string;
  done: boolean;
  onPress?: () => void;
  isLast?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.line,
      }}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 6,
          borderWidth: 1.5,
          borderColor: done ? colors.brand : colors.line,
          backgroundColor: done ? colors.brand : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done && <Feather name="check" size={12} color="#fff" />}
      </View>
      <AppText size={13} color={done ? colors.ink3 : colors.ink} style={done ? { textDecorationLine: 'line-through' } : undefined}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
}
