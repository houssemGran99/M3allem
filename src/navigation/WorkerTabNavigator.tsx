import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { WorkerTabParamList } from './types';
import JobFeedScreen from '../screens/worker/JobFeedScreen';
import DiaryScreen from '../screens/worker/DiaryScreen';
import EarningsScreen from '../screens/worker/EarningsScreen';
import WorkerMessagesScreen from '../screens/worker/WorkerMessagesScreen';
import WorkerProfileScreen from '../screens/worker/WorkerProfileScreen';

const Tab = createBottomTabNavigator<WorkerTabParamList>();

const icons: Record<keyof WorkerTabParamList, React.ComponentProps<typeof Feather>['name']> = {
  Jobs: 'briefcase',
  Diary: 'calendar',
  Earnings: 'credit-card',
  WorkerMessages: 'message-circle',
  Profile: 'user',
};

const labels: Record<keyof WorkerTabParamList, string> = {
  Jobs: 'Jobs',
  Diary: 'Diary',
  Earnings: 'Earnings',
  WorkerMessages: 'Messages',
  Profile: 'Profile',
};

export default function WorkerTabNavigator() {
  const { colors, fontFamily } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.ink3,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.line, height: 58, paddingBottom: 6, paddingTop: 6 },
        tabBarLabelStyle: { fontFamily: fontFamily.medium, fontSize: 10 },
        tabBarLabel: labels[route.name as keyof WorkerTabParamList],
        tabBarIcon: ({ color, size }) => (
          <Feather name={icons[route.name as keyof WorkerTabParamList]} size={size ? size - 2 : 18} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Jobs" component={JobFeedScreen} />
      <Tab.Screen name="Diary" component={DiaryScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="WorkerMessages" component={WorkerMessagesScreen} />
      <Tab.Screen name="Profile" component={WorkerProfileScreen} />
    </Tab.Navigator>
  );
}
