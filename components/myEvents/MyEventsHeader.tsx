import React from 'react'
import { View } from 'react-native';

import { Appbar, Text, useTheme } from 'react-native-paper';

import {ChatSvg} from '../svg/general';
import { AppHeader, SvgView } from '../general';
import { SpacingStyles } from '../../styles';

const MyEventsHeader = () => {

    const theme = useTheme();
    return(
        <AppHeader>
            <Text variant='headlineMedium' style={{position: 'absolute', alignSelf: 'center', color: 'white'}}>Your Events</Text>
            <SvgView size='small' onPress={() => console.log("[MyEventsHeader]: open chat")} style={{position: 'absolute', right: 0, backgroundColor: theme.colors.primary}}>
                <ChatSvg></ChatSvg>
            </SvgView>
        </AppHeader>
    );
};

export default MyEventsHeader;

