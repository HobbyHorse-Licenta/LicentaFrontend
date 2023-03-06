import React, { useEffect} from 'react'
import { StyleSheet, View, StatusBar } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { setStatusBarHeight } from './redux/ui';
import MainStack from './stacks/MainStack';
import { SafeAreaView } from 'react-navigation';


const WholeScreen = () => {

    const {windowHeight, navigationBarHeight} = useSelector((state: any) => state.ui)
    
    const dispatch = useDispatch();
    const theme = useTheme();


    
    useEffect(() => {
      const statusSize = getStatusBarHeight();
      dispatch(setStatusBarHeight(statusSize));
    }, []);

    return (
       <SafeAreaView style={[styles.container, {backgroundColor: 'theme.colors.background'}]}>
            <StatusBar
            animated={true}
            backgroundColor={theme.colors.primary}
            barStyle={'dark-content'}
            // showHideTransition={statusBarTransition}
            hidden={false}
            />
            {/* <View style={[{width: '100%', height: notificationBarHeight},
                  Platform.OS === "ios" ? {backgroundColor: theme.colors.background} : null ]}>
            </View> */}

            <View style={{ width:'100%', height: '100%', justifyContent:'center', alignItems: 'center', backgroundColor: 'purple'}}>
              <MainStack></MainStack>
            </View>

            {/* <View style={{width: '100%', height: navigationBarHeight, backgroundColor: 'yellow'}}>
            </View> */}
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