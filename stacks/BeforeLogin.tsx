import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from '../screens/preLogin/LoadingScreen';
import LoginScreen from '../screens/preLogin/LoginScreen';
import SignUpScreen from '../screens/preLogin/SignUpScreen';

const BeforeLogin = () => {

  const Stack = createNativeStackNavigator();
  
  return ( 
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SignIn'>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{ title: 'Welcome!' }}
          />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default BeforeLogin;