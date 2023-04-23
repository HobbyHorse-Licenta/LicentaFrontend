import React, { useState, useEffect } from 'react'
import { View, ScrollView, FlatList, StyleSheet} from 'react-native';

import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Fetch } from '../../services';
import { SpacingStyles } from '../../styles';
import { EventCard, TextImage } from '../general';
import { Event } from '../../types';
import { scale } from 'react-native-size-matters';

const EventsBody = () => {

    const navigation = useNavigation();

    const [events, setEvents] = useState<Array<Event>>([]);
    const theme = useTheme();

    function resiterFunc(){
        console.log('register now');
    }

    useEffect(() => {
     // setEvents(Fetch.getEvents()); 
    }, [])
    
    
    return(
        <View style={[StyleSheet.absoluteFill, SpacingStyles.centeredContainer, {padding: '5%', backgroundColor: 'theme.colors.background'}]}>
            {
                events.length > 0 ? (
                    <FlatList   
                        data={events}
                        style={[StyleSheet.absoluteFill,{ padding: scale(20)}]}
                        renderItem = {
                            ({item}) => (<EventCard key={item.id} event={item}
                                            onPress={() => navigation.navigate('EventDisplay' as never, {event: item} as never)}
                                        ></EventCard>)
                        }
                        ListHeaderComponent={(
                        <View style={[SpacingStyles.centeredContainer, {height: '60%', width:'100%'}]}>
                            <TextImage></TextImage>
                        </View>
                        )}
                    />
                    // <ScrollView style={{margin: '3%'}}>
                    //     {events.map((evnt) => {
                    //         return(
                    //             <EventCard key={evnt.id} event={evnt}
                    //             onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></EventCard>
                    //         );
                    //     })}
                    // </ScrollView>
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


