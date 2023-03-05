import React, { useEffect} from 'react'
import { Platform, StyleSheet, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';

import { AllEvents, Schedule } from './screens/postLogin/events';
import { SizeUtil } from './utils';
import { setNavigationBarHeight, setNotificationBarHeight, setWindowHeight } from './redux/ui';
import { EditProfile } from './screens/postLogin/profile';
import MainStack from './stacks/MainStack';


const WholeScreen = () => {

    const {notificationBarHeight, navigationBarHeight} = useSelector((state: any) => state.ui)
    
    const dispatch = useDispatch();
    const theme = useTheme();

    
    useEffect(() => {
      const notifSize = SizeUtil.getDefaultNotificationBarSize();
      dispatch(setNotificationBarHeight(notifSize));

      const navSize = SizeUtil.getDefaultNavigationBarSize();
      dispatch(setNavigationBarHeight(navSize));

      const windowsSize = SizeUtil.getWindowSize();
      dispatch(setWindowHeight(windowsSize));


    }, []);

    return (
       
      <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[{width: '100%', height: notificationBarHeight},
            Platform.OS === "ios" ? {backgroundColor: theme.colors.surface} : null ]}>
      </View>

      <View style={{ width:'100%', justifyContent:'center', alignItems: 'center', backgroundColor: 'purple'}}>
         <MainStack></MainStack>
      </View>

      <View style={{width: '100%', height: navigationBarHeight}}>
      </View>

    </View>
    );
};

export default WholeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%'
    },
  });