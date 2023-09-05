import React, { useState, useEffect } from 'react'

import { SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AllEventsSvg, ProfileSvg, ScheduleSvg, MyEventsSvg, MapsSvg } from '../components/svg/general';
import { EventsStack, MyProfileStack, MySchedulesStack, MyEventsStack, MapsStack } from './mainPages';
import { Intro, PersonalInfo, PreSelectStyleAndExperience, SelectSkates, SelectStyleAndExperience } from '../screens/postLogin/profileConfig';
import { SvgView } from '../components/general';
import { RootState } from '../redux/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { mapsUtils, navigationUtils } from '../utils';


const AfterLogin = () => {

  const {windowHeight} = useSelector((state: any) => state.ui);
  const {user, addingSkateProfile} = useSelector((state: RootState) => state.appState);

  // const [tabBarVisible, setTabBarVisible] = useState(true);
  const Tab = createBottomTabNavigator();
  const theme = useTheme();

  const navigation = useNavigation();

  const Stack = createNativeStackNavigator();
  const {currentRoute} = useSelector((state: any) => state.globalState);
  const tabBarVisible = navigationUtils.ShouldHaveTabBar(currentRoute);

  useEffect(() => {
    mapsUtils.setNavigator(navigation)
  }, [])
  
  const initialStackName = currentRoute !== undefined ? currentRoute + "Stack" : "EventsStack";

  const {firstProfileConfig} = useSelector((state: RootState) => state.appState)


  return ( 
    <SafeAreaView style={[{width: '100%', height: windowHeight}]}>
    { 
      (user === undefined || addingSkateProfile === true) ?
      (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Intro'>
          {addingSkateProfile !== true &&  <Stack.Screen name="Intro" component={Intro} />}    
          <Stack.Screen name="SelectSkates" component={SelectSkates} />
          <Stack.Screen name="PreSelectStyleAndExperience" component={PreSelectStyleAndExperience} />
          <Stack.Screen name="SelectStyleAndExperience" component={SelectStyleAndExperience} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        </Stack.Navigator>
      ):
      (
      <Tab.Navigator
        initialRouteName={firstProfileConfig === true ? "EventsStack" : initialStackName}
        screenOptions={{
          tabBarActiveTintColor: theme.colors.tertiary,
          headerShown: false,
          tabBarStyle: tabBarVisible ? {display: 'flex'} : {display: 'none', position: 'absolute', bottom: -200},
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
            //tabBarBadge: 3,
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