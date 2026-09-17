import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import { TranslationKey } from '../i18n/translations';
import { ClientTabParamList } from './types';
import HomeScreen from '../screens/client/HomeScreen';
import PostRequestScreen from '../screens/client/PostRequestScreen';
import QuotesScreen from '../screens/client/QuotesScreen';
import MessagesScreen from '../screens/client/MessagesScreen';
import AccountScreen from '../screens/client/AccountScreen';

const Tab = createBottomTabNavigator<ClientTabParamList>();

const icons: Record<keyof ClientTabParamList, React.ComponentProps<typeof Feather>['name']> = {
  Home: 'home',
  PostRequest: 'plus',
  Quotes: 'briefcase',
  Messages: 'message-circle',
  Account: 'user',
};

const labelKeys: Record<keyof ClientTabParamList, TranslationKey> = {
  Home: 'nav_home',
  PostRequest: 'nav_post',
  Quotes: 'nav_quotes',
  Messages: 'nav_msg',
  Account: 'nav_account',
};

export default function ClientTabNavigator() {
  const { colors, fontFamily, fontFamilyAr } = useTheme();
  const { t, isRTL } = useLanguage();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.ink3,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.line, height: 58, paddingBottom: 6, paddingTop: 6 },
        tabBarLabelStyle: { fontFamily: isRTL ? fontFamilyAr.medium : fontFamily.medium, fontSize: 10 },
        tabBarLabel: t(labelKeys[route.name as keyof ClientTabParamList]),
        tabBarIcon: ({ color, size }) => (
          <Feather name={icons[route.name as keyof ClientTabParamList]} size={size ? size - 2 : 18} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="PostRequest" component={PostRequestScreen} />
      <Tab.Screen name="Quotes" component={QuotesScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
