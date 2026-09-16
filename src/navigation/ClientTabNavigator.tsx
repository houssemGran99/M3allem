import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { ClientTabParamList } from './types';
import HomeScreen from '../screens/client/HomeScreen';
import SearchScreen from '../screens/client/SearchScreen';
import BookingsScreen from '../screens/client/BookingsScreen';
import MessagesScreen from '../screens/client/MessagesScreen';
import AccountScreen from '../screens/client/AccountScreen';

const Tab = createBottomTabNavigator<ClientTabParamList>();

const icons: Record<keyof ClientTabParamList, React.ComponentProps<typeof Feather>['name']> = {
  Home: 'home',
  Search: 'search',
  Bookings: 'calendar',
  Messages: 'message-circle',
  Account: 'user',
};

export default function ClientTabNavigator() {
  const { colors, fontFamily } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.ink3,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.line, height: 58, paddingBottom: 6, paddingTop: 6 },
        tabBarLabelStyle: { fontFamily: fontFamily.medium, fontSize: 10 },
        tabBarIcon: ({ color, size }) => (
          <Feather name={icons[route.name as keyof ClientTabParamList]} size={size ? size - 2 : 18} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
