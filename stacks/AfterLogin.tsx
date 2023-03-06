import React, {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'

import { SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';

import { AllEvents, Maps, MyEvents, Schedule } from '../screens/postLogin/events';
import { AllEventsSvg, ProfileSvg, ScheduleSvg, MyEventsSvg, MapsSvg } from '../components/svg/general';
import { MyProfile } from '../screens/postLogin/profile';
import { setBottomBarHeight } from '../redux/ui';
import { SpacingStyles } from '../styles';

const AfterLogin = () => {

  const Tab = createBottomTabNavigator();
  const {windowHeight} = useSelector((state: any) => state.ui)
  const theme = useTheme();
 
  
  

  return ( 
    <SafeAreaView style={[SpacingStyles.fullSizeContainer]}>
      <Tab.Navigator
        initialRouteName="AllEvents"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.tertiary,
          headerShown: false
        }}
        >

        <Tab.Screen
          name="Schedule"
          component={Schedule}
          options={{
          tabBarLabel: 'Schedules',
          tabBarIcon: () => (
            <View style={styles.icon}>
              <ScheduleSvg></ScheduleSvg>
            </View>
          ),
          }}
        />

        <Tab.Screen
          name="MyEvents"
          component={MyEvents}
          options={{
            tabBarLabel: 'My events',
            tabBarIcon: () => (
              <View style={styles.icon}>
                <MyEventsSvg></MyEventsSvg>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="AllEvents"
          component={AllEvents}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: () => (
              <View style={styles.icon}>
                  <AllEventsSvg></AllEventsSvg>
              </View>
            ),
            tabBarBadge: 3,
          }}
        />

        <Tab.Screen
          name="Maps"
          component={Maps}
          options={{
          tabBarLabel: 'Maps',
          tabBarIcon: () => (
            <View style={styles.icon}>
                <MapsSvg></MapsSvg>
            </View>
          ),
          }}
        />

        <Tab.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <View style={styles.icon}>
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

const styles = StyleSheet.create({
  icon: {
    width: scale(60),
    height: scale(60),
    padding: scale(15),
  }
});