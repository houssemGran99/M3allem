import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkerStackParamList } from './types';
import WorkerTabNavigator from './WorkerTabNavigator';
import LeadDetailScreen from '../screens/worker/LeadDetailScreen';

const Stack = createNativeStackNavigator<WorkerStackParamList>();

export default function WorkerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkerTabs" component={WorkerTabNavigator} />
      <Stack.Screen name="LeadDetail" component={LeadDetailScreen} />
    </Stack.Navigator>
  );
}
