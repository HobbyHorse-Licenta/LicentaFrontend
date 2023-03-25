import React, {useRef, useEffect} from 'react'
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
import { navigationService } from '../utils';
import { PersonalInfo, SelectSkates, SelectSport, SelectStyleAndExperience } from '../screens/postLogin/profileConfig';


const AfterLogin = () => {

  const {windowHeight} = useSelector((state: any) => state.ui);
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const dispatch = useDispatch();
  const popUp = useRef<NotificationPopup | null>(null);

  const Stack = createNativeStackNavigator();
 
  const {currentRoute, initialProfileConfigured} = useSelector((state: any) => state.appState);
  const show = navigationService.ShouldHaveTabBar(currentRoute);

  useEffect(() => {
    //dispatch(setMySchedules(Fetch.getSchedules()));
  }, [])



  return ( 
    <SafeAreaView style={[{width: '100%', height: windowHeight}]}>
    { 
      (initialProfileConfigured == false) ?
      (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SelectSport'>
          <Stack.Screen name="SelectSport" component={SelectSport} />
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
          tabBarStyle: show ? {display: 'flex'} : {display: "flex", position: 'absolute', bottom: -200},
        }}
      >

        <Tab.Screen
          name="MySchedulesStack"
          component={MySchedulesStack}
          options={{
          tabBarLabel: 'Schedules',
          tabBarIcon: () => (
            <View style={SpacingStyles.icon}>
              <ScheduleSvg></ScheduleSvg>
            </View>
          ),
          }}
        />

        <Tab.Screen
          name="MyEventsStack"
          component={MyEventsStack}
          options={{
            tabBarLabel: 'My events',
            tabBarIcon: () => (
              <View style={SpacingStyles.icon}>
                <MyEventsSvg></MyEventsSvg>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="EventsStack"
          component={EventsStack}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: () => (
              <View style={SpacingStyles.icon}>
                  <AllEventsSvg></AllEventsSvg>
              </View>
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
            <View style={SpacingStyles.icon}>
                <MapsSvg></MapsSvg>
            </View>
          ),
          }}
        />

        <Tab.Screen
          name="MyProfileStack"
          component={MyProfileStack}
          options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <View style={SpacingStyles.icon}>
                <ProfileSvg></ProfileSvg>
            </View>
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