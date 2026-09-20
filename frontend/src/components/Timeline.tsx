import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import AppText from './AppText';

export type TimelineStep = {
  id: string;
  title: string;
  detail?: string;
  state: 'done' | 'now' | 'upcoming';
};

export default function Timeline({ steps }: { steps: TimelineStep[] }) {
  const { colors } = useTheme();
  const { isRTL } = useLanguage();
  const sideKey = isRTL ? 'right' : 'left';

  return (
    <View style={{ [isRTL ? 'paddingRight' : 'paddingLeft']: 20 }}>
      {steps.map((step, i) => (
        <View key={step.id} style={{ paddingVertical: 5, position: 'relative' }}>
          {i !== steps.length - 1 && (
            <View
              style={{
                position: 'absolute',
                [sideKey]: -15,
                top: 16,
                bottom: -5,
                width: 2,
                backgroundColor: colors.line,
              }}
            />
          )}
          <View
            style={{
              position: 'absolute',
              [sideKey]: -19,
              top: 6,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: step.state === 'done' ? colors.brand : colors.card,
              borderWidth: 2,
              borderColor: step.state === 'upcoming' ? colors.line : colors.brand,
            }}
          />
          <AppText size={13} weight="semibold" color={step.state === 'upcoming' ? colors.ink2 : step.state === 'now' ? colors.brand : colors.ink}>
            {step.title}
          </AppText>
          {step.detail && (
            <AppText size={11} color={colors.ink2} style={{ marginTop: 1 }}>
              {step.detail}
            </AppText>
          )}
        </View>
      ))}
    </View>
  );
}
