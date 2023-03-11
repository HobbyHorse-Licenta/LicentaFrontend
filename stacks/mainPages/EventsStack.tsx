import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Events, EventDisplay } from '../../screens/postLogin/events';

const EventsStack = () => {

  const Stack = createNativeStackNavigator();

  return ( 
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Events" component={Events}/>
        <Stack.Screen name="EventDisplay" component={EventDisplay}/>
    </Stack.Navigator>
  );
}

export default EventsStack;