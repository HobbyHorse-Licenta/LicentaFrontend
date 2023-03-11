import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MySchedules } from '../../screens/postLogin/schedules';

const MySchedulesStack = () => {

  const Stack = createNativeStackNavigator();

  return ( 
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MySchedules" component={MySchedules}/>
    </Stack.Navigator>
  );
}

export default MySchedulesStack;