import React, {useRef, useEffect, useState} from 'react'
import {View} from 'react-native'

import { SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import NotificationPopup from 'react-native-push-notification-popup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AllEventsSvg, ProfileSvg, ScheduleSvg, MyEventsSvg, MapsSvg } from '../components/svg/general';
import { SpacingStyles } from '../styles';
import { EventsStack, MyProfileStack, MySchedulesStack, MyEventsStack, MapsStack } from './mainPages';
import { navigationUtils } from '../utils';
import { PersonalInfo, SelectSkates, SelectSport, SelectStyleAndExperience } from '../screens/postLogin/profileConfig';
import { SvgView } from '../components/general';


const AfterLogin = () => {

  const {windowHeight} = useSelector((state: any) => state.ui);
  const {currentRoute, user, addingSkateProfile} = useSelector((state: any) => state.appState);
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const dispatch = useDispatch();
  const popUp = useRef<NotificationPopup | null>(null);

  const Stack = createNativeStackNavigator();
  
  useEffect(() => {
    console.log("Route updated " + currentRoute);
    setTabBarVisible(navigationUtils.ShouldHaveTabBar(currentRoute));
    //dispatch(setMySchedules(Fetch.getSchedules()));
  }, [currentRoute])



  return ( 
    <SafeAreaView style={[{width: '100%', height: windowHeight}]}>
    { 
      (user === undefined || addingSkateProfile === true) ?
      (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SelectSport'>
          {addingSkateProfile !== true &&  <Stack.Screen name="SelectSport" component={SelectSport} />}    
          <Stack.Screen name="SelectSkates" component={SelectSkates} />
          <Stack.Screen name="SelectStyleAndExperience" component={SelectStyleAndExperience} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        </Stack.Navigator>
      ):
      (
      <Tab.Navigator
        initialRouteName="EventsStack"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.tertiary,
          headerShown: false,
          tabBarStyle: tabBarVisible ? {display: 'flex'} : {display: "flex", position: 'absolute', bottom: -200},
        }}
      >

        <Tab.Screen
          name="MySchedulesStack"
          component={MySchedulesStack}
          options={{
          tabBarLabel: 'Schedules',
          tabBarIcon: () => (
            <SvgView size='medium'>
              <ScheduleSvg></ScheduleSvg>
            </SvgView>
          ),
          }}
        />

        <Tab.Screen
          name="MyEventsStack"
          component={MyEventsStack}
          options={{
            tabBarLabel: 'My events',
            tabBarIcon: () => (
              <SvgView size='medium'>
                <MyEventsSvg></MyEventsSvg>
              </SvgView>
            ),
          }}
        />

        <Tab.Screen
          name="EventsStack"
          component={EventsStack}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: () => (
              <SvgView size='medium'>
               <AllEventsSvg></AllEventsSvg>
              </SvgView>
            ),
            tabBarBadge: 3,
          }}
        />

        <Tab.Screen
          name="MapsStack"
          component={MapsStack}
          options={{
          tabBarLabel: 'Maps',
          tabBarIcon: () => (
            <SvgView size='medium'>
              <MapsSvg></MapsSvg>
            </SvgView>
          ),
          }}
        />

        <Tab.Screen
          name="MyProfileStack"
          component={MyProfileStack}
          options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <SvgView size='medium'>
              <ProfileSvg></ProfileSvg>
            </SvgView>
          ),
          }}
        />

      </Tab.Navigator>
      )
    }
    </SafeAreaView>
   
  );
}

export default AfterLogin;