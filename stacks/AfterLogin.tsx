import React, {useRef, useEffect} from 'react'
import {View} from 'react-native'

import { SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import NotificationPopup from 'react-native-push-notification-popup';

import { AllEventsSvg, ProfileSvg, ScheduleSvg, MyEventsSvg, MapsSvg } from '../components/svg/general';
import { SpacingStyles } from '../styles';
import { EventsStack, MyProfileStack, MySchedulesStack, MyEventsStack, MapsStack } from './mainPages';
import { useNavigation, useRoute } from '@react-navigation/native';
import { navigationService } from '../utils';
import {setMySchedules} from '../redux/appState';
import { Fetch } from '../services';


const AfterLogin = () => {

  const {windowHeight} = useSelector((state: any) => state.ui);
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const dispatch = useDispatch();
  const popUp = useRef<NotificationPopup | null>(null);

 
  const {currentRoute} = useSelector((state: any) => state.appState);
  const show = navigationService.ShouldHaveTabBar(currentRoute);

  useEffect(() => {
    //dispatch(setMySchedules(Fetch.getSchedules()));
  }, [])



  return ( 
    <SafeAreaView style={[{width: '100%', height: windowHeight}]}>
      <Tab.Navigator
        initialRouteName="EventsStack"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.tertiary,
          headerShown: false,
          tabBarStyle: {display: show ? "flex" : "none"}
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
    </SafeAreaView>
   
  );
}

export default AfterLogin;