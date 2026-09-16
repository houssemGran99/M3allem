import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import AppText from './AppText';

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
};

export default function Chip({ label, active, onPress, icon }: Props) {
  const { colors, radii } = useTheme();
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        height: 28,
        paddingHorizontal: 11,
        borderRadius: radii.pill,
        borderWidth: 1,
        borderColor: active ? colors.brand : colors.line,
        backgroundColor: active ? colors.brand : colors.card,
      }}
    >
      {icon}
      <AppText size={12} weight={active ? 'medium' : 'regular'} color={active ? '#FFFFFF' : colors.ink2}>
        {label}
      </AppText>
    </Wrapper>
  );
}
