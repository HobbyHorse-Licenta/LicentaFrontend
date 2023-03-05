import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AllEvents, Schedule } from '../screens/postLogin/events';

const AfterLogin = () => {

  const Stack = createNativeStackNavigator();
  
  return ( 
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='AllEvents'>
        <Stack.Screen name="AllEvents" component={AllEvents} />
        <Stack.Screen name="Schedule" component={Schedule} />
    </Stack.Navigator>
  );
}

export default AfterLogin;