import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MyEvents } from '../../screens/postLogin/events';

const MyEventsStack = () => {

  const Stack = createNativeStackNavigator();

  return ( 
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyEvents" component={MyEvents}/>
    </Stack.Navigator>
  );
}

export default MyEventsStack;