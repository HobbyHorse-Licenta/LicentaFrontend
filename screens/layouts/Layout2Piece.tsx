import React from 'react';
import {View} from 'react-native';
import { verticalScale } from 'react-native-size-matters';

import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';


interface Params{
    header: any,
    body: any,
}

const Layout2Piece = ({header, body} : Params) => {
    
    const {windowHeight} = useSelector((state: any) => state.ui)
    
    return (
        <SafeAreaView style={{width: '100%', height: windowHeight, display: 'flex'}}>
            <View style={{height: verticalScale(50), width: '100%'}}>
            {header}
            </View>
            <View style={{height: windowHeight - verticalScale(50), width: '100%'}}>
                {body}
            </View>
        </SafeAreaView>
    );
};

export default Layout2Piece;
