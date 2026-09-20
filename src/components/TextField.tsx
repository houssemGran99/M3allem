import React from 'react';
import { KeyboardTypeOptions, TextInput, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import AppText from './AppText';

export default function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  error,
  multiline,
  numberOfLines,
}: {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
}) {
  const { colors, radii, fontFamily, fontFamilyAr } = useTheme();
  const { isRTL } = useLanguage();

  return (
    <View style={{ marginBottom: 14 }}>
      {label && (
        <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </AppText>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.ink3}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={{
          height: multiline ? 22 * (numberOfLines ?? 4) + 24 : 46,
          borderRadius: radii.control + 2,
          borderWidth: 1,
          borderColor: error ? colors.red : colors.line,
          backgroundColor: colors.sub,
          paddingHorizontal: 14,
          paddingVertical: multiline ? 12 : 0,
          fontSize: 14,
          color: colors.ink,
          fontFamily: isRTL ? fontFamilyAr.regular : fontFamily.regular,
          textAlign: isRTL ? 'right' : 'left',
          writingDirection: isRTL ? 'rtl' : 'ltr',
        }}
      />
      {error && (
        <AppText size={11} color={colors.red} style={{ marginTop: 4 }}>
          {error}
        </AppText>
      )}
    </View>
  );
}
