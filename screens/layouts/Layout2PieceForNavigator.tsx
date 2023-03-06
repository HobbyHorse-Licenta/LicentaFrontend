import React from 'react';
import {View} from 'react-native';

import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';

import { SizeUtil } from '../../utils'

interface Params{
    header: any,
    body: any,
}

const Layout2PieceForNavigator = ({header, body} : Params) => {
    
    const {windowHeightWithoutBottomBar} = useSelector((state: any) => state.ui)
    
    return (
        <SafeAreaView style={{width: '100%', height: windowHeightWithoutBottomBar, display: 'flex'}}>
            <View style={{flex: 1, width: '100%'}}>
                {header}
            </View>
            <View style={{flex: 12, width: '100%'}}>
                {body}
            </View>
        </SafeAreaView>
    );
};

export default Layout2PieceForNavigator;
