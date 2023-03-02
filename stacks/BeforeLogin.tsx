import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoadingScreen, LoginScreen, SignUpScreen } from '../screens/preLogin';

const BeforeLogin = () => {

  const Stack = createNativeStackNavigator();
  
  return ( 
    //<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      //<SafeAreaView>
        <Stack.Navigator>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen
              name="SignIn"
              component={LoginScreen}
              options={{ title: 'Welcome!' }}
              />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
     // </SafeAreaView>
    //</NavigationContainer>
  );
}

export default BeforeLogin;