import React from 'react'
import { View } from 'react-native';

import { Appbar } from 'react-native-paper';

import {ChatSvg} from '../svg/general';
import { AppHeader } from '../general';

const EventsHeader = () => {

    const _goBack = () => {
        console.log("gobackk");
    }

    return(
        <AppHeader>
             <Appbar.BackAction onPress={_goBack} />
             <View style={{width: '70%'}}></View>
             <View onTouchEnd={() => console.log("Chat")} style={{height: '80%', width:'18%'}}>
                     <ChatSvg></ChatSvg>
             </View>
        </AppHeader>
    );
};

export default EventsHeader;

