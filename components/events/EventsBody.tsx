import React from 'react'
import { View, ScrollView} from 'react-native';

import { useTheme } from 'react-native-paper';

import { SpacingStyles } from '../../styles';
import { EventCard, TextImage } from '../general';

const EventsBody = () => {

    const theme = useTheme();

    function resiterFunc(){
        console.log('register now');
    }
    
    return(
        <View style={[SpacingStyles.fullSizeContainer, SpacingStyles.centeredContainer, {padding: '5%', backgroundColor: theme.colors.background}]}>
            <View style={[SpacingStyles.centeredContainer, {height: '35%', width:'100%'}]}>
                <TextImage></TextImage>
            </View>
            <ScrollView style={{margin: '3%'}}>
                <EventCard></EventCard>
                <EventCard></EventCard>
                <EventCard></EventCard>
                <EventCard></EventCard>
             </ScrollView>
        </View>
    );
};

export default EventsBody;


