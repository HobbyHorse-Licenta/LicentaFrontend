import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AllEvents } from '../screens/postLogin/events';

const AfterLogin = () => {

  const Stack = createNativeStackNavigator();
  
  return ( 
      <Stack.Navigator>
              {/* <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{ title: 'Welcome!' }}
                  />
              <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
              <Stack.Screen name="AllEvents" component={AllEvents} />
      </Stack.Navigator>
  );
}

export default AfterLogin;