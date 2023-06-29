import React from 'react';
import {View, StyleSheet} from 'react-native';

import { verticalScale } from 'react-native-size-matters';

import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';


interface Params{
    header: any,
    body: any,
}

const Layout2Piece = ({header, body} : Params) => {
    
    const {windowHeight} = useSelector((state: any) => state.ui)
    
    const headerHeight = verticalScale(50);

    return (
        <SafeAreaView style={[StyleSheet.absoluteFill]}>
            <View style={{height: headerHeight, width: '100%', position: 'absolute'}}>
                {header}
            </View>
            <View style={{height: windowHeight - headerHeight, width: '100%', position: 'absolute', top: headerHeight}}>
                {body}
            </View>
        </SafeAreaView>
    );
};

export default Layout2Piece;
