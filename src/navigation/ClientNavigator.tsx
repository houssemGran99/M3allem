import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientStackParamList } from './types';
import ClientTabNavigator from './ClientTabNavigator';
import ProfessionalProfileScreen from '../screens/client/ProfessionalProfileScreen';
import BookingScreen from '../screens/client/BookingScreen';
import TrackingScreen from '../screens/client/TrackingScreen';
import ReviewScreen from '../screens/client/ReviewScreen';

const Stack = createNativeStackNavigator<ClientStackParamList>();

export default function ClientNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClientTabs" component={ClientTabNavigator} />
      <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfileScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
}
