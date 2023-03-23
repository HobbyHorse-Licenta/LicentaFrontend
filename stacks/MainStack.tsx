import React, {useState} from 'react';
import {View} from 'react-native'

import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';
import { SpacingStyles } from '../styles';
import { setCurrentRoute } from '../redux/appState';

const MainStack = () => {

  const [routeName, setRouteName] = useState<string>();
  const { isLoggedIn } = useSelector((state: any) => state.appState)

  const Stack = createNativeStackNavigator();
  const navigationRef = createNavigationContainerRef();

  const dispatch = useDispatch();

  return ( 
    <View style={[SpacingStyles.fullSizeContainer, {backgroundColor: 'orange'}]}> 
      <NavigationContainer ref={navigationRef}
      onReady={() => setRouteName(navigationRef.getCurrentRoute()?.name)}
      onStateChange={async () => {
        const currentRouteName = navigationRef.getCurrentRoute()?.name;
        if(currentRouteName != undefined)
          dispatch(setCurrentRoute(currentRouteName));
      }}
      >
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