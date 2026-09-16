import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkerStackParamList } from './types';
import WorkerTabNavigator from './WorkerTabNavigator';
import JobDetailScreen from '../screens/worker/JobDetailScreen';
import ActiveJobScreen from '../screens/worker/ActiveJobScreen';

const Stack = createNativeStackNavigator<WorkerStackParamList>();

export default function WorkerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkerTabs" component={WorkerTabNavigator} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} />
      <Stack.Screen name="ActiveJob" component={ActiveJobScreen} />
    </Stack.Navigator>
  );
}
