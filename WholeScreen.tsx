import React, { useEffect, useMemo} from 'react'
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';

import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { setWindowHeight } from './redux/ui';
import MainStack from './stacks/MainStack';
import { SafeAreaView } from 'react-navigation';
import { Platform } from 'expo-modules-core';

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

const WholeScreen = () => {
  
    
    const dispatch = useDispatch();
    const theme = useTheme();


   // const statusBarHeight = useMemo(() => getStatusBarHeight(), []);

    const windowHeight = useMemo(() => getWindowHeight(), []);
    
    useEffect(() => {
      if(windowHeight != undefined)
        dispatch(setWindowHeight(windowHeight));
    }, [windowHeight]);

    return (
      <SafeAreaView style={[styles.container, {backgroundColor: 'theme.colors.background'}]}>
            <StatusBar
            animated={true}
            backgroundColor={theme.colors.primary}
            barStyle={'dark-content'}
            // showHideTransition={statusBarTransition}
            hidden={false}
            />
            <View style={{ width:'100%', height: windowHeight, justifyContent:'center', alignItems: 'center'}}>
              <MainStack></MainStack>
            </View>
      </SafeAreaView>
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