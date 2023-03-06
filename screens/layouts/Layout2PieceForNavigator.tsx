import React from 'react';
import {View} from 'react-native';

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

    const windowHeightWithoutBar = windowHeight - useBottomTabBarHeight();
    
    return (
        <SafeAreaView style={{width: '100%', height: windowHeightWithoutBar, display: 'flex', flex: 1}}>
            <View style={{flex: 1.2, width: '100%'}}>
                {header}
            </View>
            <View style={{flex: 15, width: '100%'}}>
                {body}
            </View>
        </SafeAreaView>
    );
};

export default Layout2PieceForNavigator;
