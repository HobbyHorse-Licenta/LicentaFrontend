import React, { useState, useEffect } from 'react'
import { View, ScrollView} from 'react-native';

import { Text, useTheme } from 'react-native-paper';

import { Fetch } from '../../services';
import { SpacingStyles } from '../../styles';
import { EventCard, TextImage } from '../general';
import { Event } from '../../types';

const EventsBody = () => {

    const [events, setEvents] = useState<Array<Event>>([]);
    const theme = useTheme();

    function resiterFunc(){
        console.log('register now');
    }

    useEffect(() => {
      setEvents(Fetch.getEvents()); 
    }, [])
    
    
    return(
        <View style={[SpacingStyles.fullSizeContainer, SpacingStyles.centeredContainer, {padding: '5%', backgroundColor: theme.colors.background}]}>
            <View style={[SpacingStyles.centeredContainer, {height: '35%', width:'100%'}]}>
                <TextImage></TextImage>
            </View>
            {
                events.length > 0 ? (
                    <ScrollView style={{margin: '3%'}}>
                        {events.map((evnt) => {
                            return(
                                <EventCard key={evnt.id} event={evnt}></EventCard>
                            );
                        })}
                    </ScrollView>
                ):(
                    <View>
                        <Text>No Events</Text>
                    </View>
                )
            }
            
        </View>
    );
};

export default EventsBody;


