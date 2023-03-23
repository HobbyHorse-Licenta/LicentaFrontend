import React, { useEffect, useMemo} from 'react'
import { StyleSheet, View, StatusBar, Dimensions, Platform } from 'react-native';

import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { setWindowHeight } from './redux/ui';
import MainStack from './stacks/MainStack';
import { SafeAreaView } from 'react-navigation';

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


    const windowHeight = useMemo(() => getWindowHeight(), []);
    
    useEffect(() => {
      if(windowHeight != undefined)
        dispatch(setWindowHeight(windowHeight));
    }, [windowHeight]);

    const getBody = () => {
      if(Platform.OS === 'ios')
        return(
          <MainStack></MainStack>
        );
      else return (
      <SafeAreaView style={[StyleSheet.absoluteFill, {backgroundColor: 'theme.colors.background'}]}>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.primary}
          barStyle={'dark-content'}
          showHideTransition={undefined}
          hidden={false}
          />
          <View style={{ width:'100%', height: windowHeight, justifyContent:'center', alignItems: 'center'}}>
            <MainStack></MainStack>
          </View>
        </SafeAreaView>
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