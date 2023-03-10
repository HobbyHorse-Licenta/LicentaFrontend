import React from 'react'
import { View } from 'react-native';

import { Appbar, useTheme } from 'react-native-paper';

import {ChatSvg} from '../svg/general';
import { AppHeader, SvgView } from '../general';

const EventsHeader = () => {

    const theme = useTheme();
    
    const _goBack = () => {
        console.log("gobackk");
    }

    return(
        <AppHeader>
             <Appbar.BackAction onPress={_goBack} />
             <View style={{width: '70%'}}></View>
             <SvgView onTouchEnd={() => console.log("Chat")} style={{position: 'absolute', right: 0, backgroundColor: theme.colors.primary}}>
                <ChatSvg></ChatSvg>
             </SvgView>
        </AppHeader>
    );
};

export default EventsHeader;

