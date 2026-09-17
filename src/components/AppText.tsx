import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';

type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

type Props = TextProps & {
  weight?: Weight;
  color?: string;
  size?: number;
  style?: TextStyle | TextStyle[];
};

export default function AppText({ weight = 'regular', color, size, style, ...rest }: Props) {
  const { colors, fontFamily, fontFamilyAr } = useTheme();
  const { isRTL } = useLanguage();
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: isRTL ? fontFamilyAr[weight] : fontFamily[weight],
          color: color ?? colors.ink,
          fontSize: size ?? 15,
          textAlign: isRTL ? 'right' : 'left',
          writingDirection: isRTL ? 'rtl' : 'ltr',
        },
        style,
      ]}
    />
  );
}
