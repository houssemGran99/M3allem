import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientStackParamList } from './types';
import ClientTabNavigator from './ClientTabNavigator';
import ArtisanProfileScreen from '../screens/client/ArtisanProfileScreen';
import AppointmentConfirmedScreen from '../screens/client/AppointmentConfirmedScreen';
import CompletedReviewScreen from '../screens/client/CompletedReviewScreen';

const Stack = createNativeStackNavigator<ClientStackParamList>();

export default function ClientNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClientTabs" component={ClientTabNavigator} />
      <Stack.Screen name="ArtisanProfile" component={ArtisanProfileScreen} />
      <Stack.Screen name="AppointmentConfirmed" component={AppointmentConfirmedScreen} />
      <Stack.Screen name="CompletedReview" component={CompletedReviewScreen} />
    </Stack.Navigator>
  );
}
