import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../state/AuthContext';
import { buildNavTheme } from './navTheme';
import AuthNavigator from './AuthNavigator';
import ClientNavigator from './ClientNavigator';
import WorkerNavigator from './WorkerNavigator';

export default function RootNavigator() {
  const { colors, isDark } = useTheme();
  const { lang } = useLanguage();
  const { status, user } = useAuth();

  if (status === 'loading') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.page }}>
        <ActivityIndicator color={colors.brand} size="large" />
      </View>
    );
  }

  const navKey = status === 'authenticated' ? `${user!.role}-${lang}` : `auth-${lang}`;

  return (
    <NavigationContainer key={navKey} theme={buildNavTheme(colors, isDark)}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {status === 'unauthenticated' && <AuthNavigator />}
      {status === 'authenticated' && user!.role === 'client' && <ClientNavigator />}
      {status === 'authenticated' && user!.role === 'worker' && <WorkerNavigator />}
    </NavigationContainer>
  );
}
