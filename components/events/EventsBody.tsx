import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet} from 'react-native';

import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid'

import { SpacingStyles } from '../../styles';
import { AggresiveEventCard, EventCard, QuestionModal } from '../general';
import { Event, Gender, ParkTrail, SkateExperience, SkatePracticeStyles } from '../../types';
import AddAggresiveSkatingEvent from './AddAggresiveSkatingEvent';
import { useTourGuideController } from 'rn-tourguide';
import { SMILING_FACE_WITH_SUNGLASSES } from '../../assets/emotes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setEventsWalkthrough } from '../../redux/walkthroughState';

const EventsBody = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {walkthroughState} = useSelector((state: RootState) => state)
    const {currentSkateProfile} = useSelector((state: RootState) => state.appState)
    const [walkthroughModalVisible, setWalkthroughModalVisible] = useState(false);

    useEffect(() => {
    if(currentSkateProfile !== undefined && currentSkateProfile !== null
        && currentSkateProfile.events !== undefined && currentSkateProfile.events !== null)
        {
            console.log("getting event that exist on the skateprofile")
            setEvents(currentSkateProfile.events);
        }
    else setEvents([]);
    }, [currentSkateProfile])

    const [events, setEvents] = useState<Array<Event>>();
    


    const {
        canStart,
        start,
        stop,
        eventEmitter,
        TourGuideZone
      } = useTourGuideController('events')

    useEffect(() => {
        if (walkthroughState !== undefined && walkthroughState.events !== undefined &&
            canStart && walkthroughState.events === true) {
          start()
        }
    }, [canStart, walkthroughState])   

    const showWalkthroughModal = () => setWalkthroughModalVisible(true);
    
    useEffect(() => {
        if(eventEmitter !== undefined)
        {
            eventEmitter.on('stop', showWalkthroughModal)
        }
    
        return () => {
            if(eventEmitter !== undefined)
            {
                eventEmitter.off('stop', showWalkthroughModal)
            }
        
        }
      }, [])

    useEffect(() => {
     // setEvents(Fetch.getEvents());
     const currentDate = new Date();
     const eventId = uuid.v4().toString();
     const gheorgheniTrail: ParkTrail = {
        id: uuid.v4().toString(),
        name: "Pista role Baza Sportiva Gheorgheni",
        practiceStyle: SkatePracticeStyles.CasualSkating,
        practiceStyle2: SkatePracticeStyles.SpeedSkating,
        capacity: 20,
        location: {
            id: uuid.v4().toString(),
            name: 'Gheorgheni Baza',
            lat: 46.77159014009401, 
            long: 23.635888336315503,
        },
        openingHour: 8,
        closingHour: 22
     }
     const event: Event = {
            id: eventId,
            imageUrl: undefined,
            name: 'La o schema',
            note: "This event has some descrition",
            gender: Gender.Mixed,
            maxParticipants: 5,
            skateExperience: SkateExperience.AdvancedBegginer,
            outing: {
                id: uuid.v4().toString(),
                eventId: eventId,
                startTime: currentDate.getTime()  + 2000,
                endTime:  currentDate.getTime()  + 8900,
                skatePracticeStyle: SkatePracticeStyles.SpeedSkating,
                trailType: 'Park Trail',
                trail: gheorgheniTrail
            }
     }
     //setEvents((prevEvents) => [...prevEvents, event]);
    }, [])
    
    const getShowWalkthroughModal = () =>{
        return(
            <QuestionModal visible={walkthroughModalVisible} onDismiss={() => setWalkthroughModalVisible(false)}
            question={"Skip walkthrough next time?"}
            onButton1Press={() => setWalkthroughModalVisible(false)} button1Text={"Don't skip"}
            onButton2Press={() => {dispatch(setEventsWalkthrough(false)); setWalkthroughModalVisible(false)}} button2Text={"Skip"}
            ></QuestionModal>
        )
    }

    return(
        <View style={[StyleSheet.absoluteFill, SpacingStyles.centeredContainer, {padding: '5%', backgroundColor: 'theme.colors.background'}]}>
            <TourGuideZone zone={1} text={`You can add an event for skating on your city streets ${SMILING_FACE_WITH_SUNGLASSES}`}>
                <AddAggresiveSkatingEvent onPress={() => navigation.navigate("CreateEvent" as never)}></AddAggresiveSkatingEvent>
            </TourGuideZone>
            {
                currentSkateProfile !== undefined && events !== null && events !== undefined && events.length > 0 ? (
                    <ScrollView style={{margin: '3%'}}>
                        {events.map((evnt) => {
                            if(currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.AggresiveSkating)
                            {
                                return(
                                    <AggresiveEventCard key={evnt.id} event={evnt}
                                    onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></AggresiveEventCard>
                                )
                            }
                            else return(
                                <EventCard key={evnt.id} event={evnt}
                                onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></EventCard>
                            );
                        })}
                    </ScrollView>
                ):(
                    <View>
                        <Text>No Events</Text>
                    </View>
                )
            }
            {getShowWalkthroughModal()}
        </View>
    );
};

export default EventsBody;


