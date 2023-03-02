import React from 'react';
import {View} from 'react-native';

import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';

interface Params{
    header: any,
    body: any,
    footer: any
}

const Layout3Piece = ({header, body, footer} : Params) => {
    
    const theme = useTheme();

    const {notificationBarHeight, navigationBarHeight, windowHeight} = useSelector((state: any) => state.ui)
   
    return (
        <SafeAreaView style={{width: '100%', height: windowHeight, display: 'flex'}}>
            <View style={{flex: 1, width: '100%'}}>
                {header}
            </View>
            <View style={{flex: 12, width: '100%'}}>
                {body}
            </View>
            <View style={{flex: 1, width: '100%'}}>
                {footer}
            </View>
        </SafeAreaView>
    );
};

export default Layout3Piece;
