import React, {useState, useEffect} from 'react';
import {View} from 'react-native'

import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';
import { SpacingStyles } from '../styles';
import { RootState } from '../redux/store';
import { CommonActions } from '@react-navigation/native';
import { validation } from '../utils';
import { setCurrentRoute } from '../redux/globalState';

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const MainStack = () => {

  const [routeName, setRouteName] = useState<string>();
  const { JWTTokenResult } = useSelector((state: RootState) => state.appState)
  const [initialState, setInitialState] = React.useState();
  const Stack = createNativeStackNavigator();
  const navigationRef = createNavigationContainerRef();

  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   const restoreState = async () => {
  //     try {
  //       //
       
  //         //const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
  //         //const state = savedStateString ? JSON.parse(savedStateString) : undefined;

  //         if (state !== undefined) {
            
  //           //console.log("am GASIT UN state + " + JSON.stringify(state));
  //           //setInitialState(state);
  //           //setInitialState(JSON.parse('{"stale":false,"type":"stack","key":"stack-Ycemt38H35CBFrzS-xng1","index":0,"routeNames":["AfterLogin"],"routes":[{"key":"AfterLogin-Ek7a0vHvMaIc2giu6E8dj","name":"AfterLogin","state":{"stale":false,"type":"tab","key":"tab-EYb4F-YctiKx6tS4KAPZj","r"routeNames":["MySchedulesStack","MyEventsStack","EventsStack","MapsStack","MyProfileStack"],"index":4,"history":[{"type":"route","key"M":"MySchedulesStack-RmSYe__yKZswNWW-GuMjz"},{"type":"route","key":"MyProfileStack-3hmjrsXodUve6rrc-AHAf"}],"routes":[{"name":"MySchedutalesStack","key":"MySchedulesStack-RmSYe__yKZswNWW-GuMjz"},{"name":"MyEventsStack","key":"MyEventsStack--29_o43kWnRfKKJkAudTy"},{"name"ts:"EventsStack","key":"EventsStack-9RRYutfoaQVvENke-Rzf4","state":{"stale":false,"type":"stack","key":"stack--QerJ9WBPzqUHU3b4f7_8","inrodex":0,"routeNames":["Events","EventDisplay"],"routes":[{"key":"Events-3I1V9kMjueUGGN3_glfH2","name":"Events"}]}},{"name":"MapsStack",sS"key":"MapsStack-Mk6LVtCWH4Z-rwDDscXwx"},{"name":"MyProfileStack","key":"MyProfileStack-3hmjrsXodUve6rrc-AHAf","state":{"stale":false,k""type":"stack","key":"stack-oKEE9mzD3WlDyzu0gFb85","index":0,"routeNames":["MyProfile","EditProfile"],"routes":[{"key":"MyProfile-srDNL3WQkzm-mCorTkLiL3C","name":"MyProfile"}]}}]}}]}'))
  //         }

  //     } finally {
  //       //
  //     }
  //   };

  //     restoreState();
  // }, []);

  useEffect(() => {
    resetNavigationState();
  }, [])
  

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