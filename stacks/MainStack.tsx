import React from 'react';
import {View} from 'react-native'

import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';
import { SpacingStyles } from '../styles';
import { lightBlue100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const MainStack = () => {

  const { isLoggedIn } = useSelector((state: any) => state.appState)

  const Stack = createNativeStackNavigator();

  return ( 
    <View style={[SpacingStyles.fullSizeContainer]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {
            (isLoggedIn) ? (
              <>
                <Stack.Screen name="AfterLogin" component={AfterLogin}/>
              </>
            ) : (
              <>
                <Stack.Screen name="BeforeLogin" component={BeforeLogin}/>
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </View>
   
       
  );
}

export default MainStack;