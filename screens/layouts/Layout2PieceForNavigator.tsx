import React from 'react';
import {Platform, View, StyleSheet} from 'react-native';

import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { verticalScale } from 'react-native-size-matters';

interface Params{
    header: any,
    body: any,
}

const Layout2PieceForNavigator = ({header, body} : Params) => {
    
    const {windowHeight} = useSelector((state: any) => state.ui)
    const bottomTabBarHeight = useBottomTabBarHeight();
   
    const windowHeightWithoutBar = windowHeight - bottomTabBarHeight;

    const headerHeight = verticalScale(50);
    return (
        <SafeAreaView style={[StyleSheet.absoluteFill]}>
            <View style={{height: headerHeight, width: '100%', position: 'absolute', top: 0}}>
                {header}
            </View>
            <View style={{height: windowHeightWithoutBar - headerHeight, width: '100%', position: 'absolute', top: headerHeight}}>
                {body}
            </View>
        </SafeAreaView>
    );
};

export default Layout2PieceForNavigator;
