import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import { TranslationKey } from '../i18n/translations';
import { WorkerTabParamList } from './types';
import LeadsScreen from '../screens/worker/LeadsScreen';
import MyQuotesScreen from '../screens/worker/MyQuotesScreen';
import CreditsScreen from '../screens/worker/CreditsScreen';
import StatusScreen from '../screens/worker/StatusScreen';
import WorkerProfileScreen from '../screens/worker/WorkerProfileScreen';

const Tab = createBottomTabNavigator<WorkerTabParamList>();

const icons: Record<keyof WorkerTabParamList, React.ComponentProps<typeof Feather>['name']> = {
  Leads: 'briefcase',
  MyQuotes: 'send',
  Credits: 'circle',
  Status: 'shield',
  Profile: 'user',
};

const labelKeys: Record<keyof WorkerTabParamList, TranslationKey> = {
  Leads: 'wnav_leads',
  MyQuotes: 'wnav_quotes',
  Credits: 'wnav_credits',
  Status: 'wnav_status',
  Profile: 'wnav_profile',
};

export default function WorkerTabNavigator() {
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
        tabBarLabel: t(labelKeys[route.name as keyof WorkerTabParamList]),
        tabBarIcon: ({ color, size }) => (
          <Feather name={icons[route.name as keyof WorkerTabParamList]} size={size ? size - 2 : 18} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Leads" component={LeadsScreen} />
      <Tab.Screen name="MyQuotes" component={MyQuotesScreen} />
      <Tab.Screen name="Credits" component={CreditsScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Profile" component={WorkerProfileScreen} />
    </Tab.Navigator>
  );
}
