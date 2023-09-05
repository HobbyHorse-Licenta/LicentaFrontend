import React, {useState, useEffect} from 'react';
import {View} from 'react-native'

import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';
import { SpacingStyles } from '../styles';
import { RootState } from '../redux/store';
import { validation } from '../utils';
import { setCurrentRoute } from '../redux/globalState';

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const MainStack = () => {

  const [routeName, setRouteName] = useState<string>();
  const { JWTTokenResult } = useSelector((state: RootState) => state.appState)
  const {currentRoute} = useSelector((state: RootState) => state.globalState)
  const [initialState, setInitialState] = React.useState();
  const Stack = createNativeStackNavigator();
  const navigationRef = createNavigationContainerRef();

  const dispatch = useDispatch();
  useEffect(() => {
    if(navigationRef !== undefined && navigationRef.getCurrentRoute()?.name !== currentRoute)
    {
      //this is in case the currentRoute is saved for a page that has no tabBar but then the app resumes to the main
      //screen of that stack and so the current route should be updated
      dispatch(setCurrentRoute(navigationRef.getCurrentRoute()?.name))
    }
  }, [navigationRef])
 
  
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: 'EventsStack' }],
  });
  
  const resetNavigationState = () => {
    if(JWTTokenResult !== undefined)
    {
      console.log("RESET NAV STATE! (THIS GIVES ERROR WHEN USER IS NOT LOGGED IN)")
      navigationRef.dispatch(resetAction)
    }

  };



  return ( 
    <View style={[SpacingStyles.fullSizeContainer, {backgroundColor: 'orange'}]}> 
      <NavigationContainer ref={navigationRef}
      onReady={() => setRouteName(navigationRef.getCurrentRoute()?.name)}
      initialState={initialState}
      onStateChange={async (state) => {
        const currentRouteName = navigationRef.getCurrentRoute()?.name;
        if(currentRouteName != undefined)
        {
          dispatch(setCurrentRoute(currentRouteName));
        }
      }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {
            (JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult)) ? (
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