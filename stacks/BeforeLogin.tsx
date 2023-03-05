import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoadingScreen, LoginScreen, SignUpScreen } from '../screens/preLogin';

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