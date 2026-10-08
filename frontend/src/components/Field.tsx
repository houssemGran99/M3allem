import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import AppText from './AppText';

export default function Field({
  icon,
  placeholder,
  value,
  multiline,
}: {
  icon?: React.ComponentProps<typeof Feather>['name'];
  placeholder: string;
  value?: string;
  multiline?: boolean;
}) {
  const { colors, radii } = useTheme();
  const { isRTL } = useLanguage();
  return (
    <View
      style={{
        minHeight: 42,
        borderRadius: radii.control + 2,
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: colors.sub,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: multiline ? 'flex-start' : 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: multiline ? 10 : 0,
      }}
    >
      {icon && <Feather name={icon} size={15} color={colors.ink3} />}
      <AppText size={13} color={value ? colors.ink : colors.ink3} style={{ flex: 1 }}>
        {value ?? placeholder}
      </AppText>
    </View>
  );
}
