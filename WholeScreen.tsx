import React, { createContext, MutableRefObject, useEffect, useMemo, useRef, useState} from 'react'
import { StyleSheet, View, StatusBar, Dimensions, Platform } from 'react-native';

import { useDispatch } from 'react-redux';
import NotificationPopup from 'react-native-push-notification-popup';
import { useTheme } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Network from 'expo-network';

import { setWindowHeight } from './redux/ui';
import MainStack from './stacks/MainStack';
import { SafeAreaView } from 'react-navigation';
import { SpacingStyles } from './styles';
import { verticalScale } from 'react-native-size-matters';
import { Fetch } from './services';
import { Skill } from './types';

const windowH = Dimensions.get("window").height;


const getWindowHeight = () => {
  if(Platform.OS === 'android')
  {
    return windowH;
  }
  else if(Platform.OS === 'ios')
  {
    return windowH - getStatusBarHeight(); 
  }  
}
export const NotifRefProvider = createContext<MutableRefObject<NotificationPopup | null> | null>(null);

const WholeScreen = () => {
  
    
    const dispatch = useDispatch();
    const theme = useTheme();
    const popUp = useRef<NotificationPopup | null>(null);

    const [skills, setSkills] = useState<Array<Skill>>();

    const windowHeight = useMemo(() => getWindowHeight(), []);
    

    useEffect(() => {
      const fetchData = async () => {
        //phone ip: 192.168.1.157
        // const promise = await Network.getIpAddressAsync();
        // console.log(promise)
        Fetch.getSkills((infoo) => console.log(infoo));
       // Fetch.postSkill(setSkills)
      };
      fetchData();
    }, []);

    useEffect(() => {
      console.log("INFO FROM FETCH: " + skills);
    }, [skills]);

    useEffect(() => {
      if(windowHeight != undefined)
        dispatch(setWindowHeight(windowHeight));
    }, [windowHeight]);

    // const getBody = () => {
    //   if(Platform.OS === 'ios')
    //     return(
    //       <View>

    //       <MainStack></MainStack>
    //       <View style={SpacingStyles.popUpContainer}></View>
    //       </View>

    //     );
    //   else return (
    //   <SafeAreaView style={[StyleSheet.absoluteFill, {backgroundColor: 'theme.colors.background'}]}>

    //     <StatusBar
    //       animated={true}
    //       backgroundColor={theme.colors.primary}
    //       barStyle={'dark-content'}
    //       showHideTransition={undefined}
    //       hidden={false}
    //       />
    //       <MainStack></MainStack>
    //       {/* <View style={{ width:'100%', height: windowHeight, justifyContent:'center', alignItems: 'center'}}>
            
    //       </View> */}
    //       <View style={SpacingStyles.popUpContainer}></View>
    //     </SafeAreaView>
    //   );
    // }

    const getBody = () => {
      return (
      <View>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.primary}
          barStyle={'dark-content'}
          showHideTransition={undefined}
          hidden={false}
        />
        <NotifRefProvider.Provider value={popUp}>
          <MainStack></MainStack>
        </NotifRefProvider.Provider>
        <View style={{width: '100%', height: 9, position: "absolute", top: Platform.OS === 'ios' ? 0 : -verticalScale(30)}}>
          <NotificationPopup
          ref={popUp}
          shouldChildHandleResponderStart={true}
          shouldChildHandleResponderMove={true} />
        </View>
      </View>
     
      );
    }
    
    return (
        getBody()
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