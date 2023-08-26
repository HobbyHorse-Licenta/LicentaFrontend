import React from 'react';
import {View} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Maps } from '../../screens/postLogin/maps';
import { EventDisplay } from '../../screens/postLogin/events';

const MapsStack = () => {

  const Stack = createNativeStackNavigator();

  return ( 
    <View style={{backgroundColor: 'red', width: '100%', height:"100%"}}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Maps" component={Maps}/>
        <Stack.Screen name="EventDisplay" component={EventDisplay}/>
        </Stack.Navigator>
    </View>
    
  );
}

export default MapsStack;