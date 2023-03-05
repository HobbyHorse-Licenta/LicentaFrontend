import React from 'react'
import { View, StyleSheet } from 'react-native';

import { useTheme } from 'react-native-paper';

import {ChatSvg} from '../svg/general';
import { SpacingStyles } from '../../styles';

const EventsHeader = () => {

    const theme = useTheme();

    return(
        <View style={[SpacingStyles.fullSizeContainer, styles.container]}>
            <View style={{height: '80%', width:'80%'}}>
                
            </View>
            <View style={[styles.svg, {backgroundColor: theme.colors.onSurface}]}>
               
            </View>
            <View onTouchEnd={() => console.log("Chat")} style={{height: '80%', width:'18%'}}>
                <ChatSvg></ChatSvg>
            </View>
        </View>
    );
};

export default EventsHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    svg: {
        height: '60%',
        width:'0.5%',
        margin: '1%',
    }
})

