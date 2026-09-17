import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import { buildNavTheme } from './navTheme';
import ClientNavigator from './ClientNavigator';
import WorkerNavigator from './WorkerNavigator';

export default function RootNavigator() {
  const { role, colors, isDark } = useTheme();
  const { lang } = useLanguage();
  return (
    <NavigationContainer key={`${role}-${lang}`} theme={buildNavTheme(colors, isDark)}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {role === 'client' ? <ClientNavigator /> : <WorkerNavigator />}
    </NavigationContainer>
  );
}
