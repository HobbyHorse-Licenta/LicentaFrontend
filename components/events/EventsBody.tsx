import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Pressable} from 'react-native';

import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid'
import {Button} from 'react-native-paper'

import { SpacingStyles } from '../../styles';
import { AggresiveEventCard, EventCard, PrimaryContainer, QuestionModal, SvgView } from '../general';
import { CustomTrail, Event, Gender, ParkTrail, SkateExperience, SkatePracticeStyles } from '../../types';
import AddAggresiveSkatingEvent from './AddAggresiveSkatingEvent';
import { useTourGuideController } from 'rn-tourguide';
import { SMILING_FACE_WITH_SUNGLASSES } from '../../assets/emotes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setEventsWalkthrough } from '../../redux/walkthroughState';
import { Fetch } from '../../services';
import { setAllParkTrails, setCurrentSkateProfile } from '../../redux/appState';
import { ChatSvg } from '../svg/general';
import SearchingSvg from '../svg/general/SearchingSvg';
import { scale } from 'react-native-size-matters';
import LeftArrowSvg from '../svg/general/LeftArrowSvg';
import RightArrowSvg from '../svg/general/RightArrowSvg';
import { uiUtils } from '../../utils';
import { nothing } from 'immer';

const EventsBody = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();


    console.log("SETTING UP");
    const customTrail: CustomTrail = {
        id: "dsaa",
        trailName: "My trail",
        checkPoints: [
            {
                id: "dsadsa",
                customTrailId: "sdadsa",
                location: {
                    id: "dsa",
                    lat: 43.002,
                    long: 23.33
                }
            }
        ]
    }

    const hardCodedEvent: Event = {
        id: "somthing",
        name: "RANDOM EVENT",
        note: "THis is a note",
        maxParticipants: 19,
        skateExperience: SkateExperience.AdvancedBegginer,
        outing: {
            id: "outinig-id",
        eventId: "somthing",
        startTime: 1685797060291,
        endTime: 1685797060291,
        skatePracticeStyle: SkatePracticeStyles.AggresiveSkating,
        trailType: 'CustomTrail',
        trail: customTrail,
        booked: false
        },
    //   skateProfiles?: Array<SkateProfile>,
    //   recommendedSkateProfiles?: Array<SkateProfile>,
        gender: Gender.Mixed,
        minimumAge: 14,
        maximumAge: 28
    }



    const {walkthroughState} = useSelector((state: RootState) => state)
    const {currentSkateProfile, user} = useSelector((state: RootState) => state.appState)
    const [skipWalkthroughPromptVisibility, setSkipWalkthroughPromptVisibility] = useState(false);
    const [events, setEvents] = useState<Array<Event>>([hardCodedEvent]);

    console.log("Events: " + JSON.stringify(events));

    useEffect(() => {
      Fetch.getAllParkTrails(
        (parkTrails) => {dispatch(setAllParkTrails(parkTrails));},
        () => console.log("Coudn't get all park trails")
      );
    }, [])
    
    useEffect(() => {
    if(currentSkateProfile !== undefined && currentSkateProfile !== null
        && currentSkateProfile.recommendedEvents !== undefined && currentSkateProfile.recommendedEvents !== null)
        {
            console.log("getting event that exist on the skateprofile")
            //setEvents(currentSkateProfile.recommendedEvents);
            console.log("RECOMMENDED EVENTS "+ JSON.stringify(currentSkateProfile.recommendedEvents))
        }
    else
    {
        //setEvents([]);
    } 
    }, [currentSkateProfile])


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

    const showWalkthroughModal = () => setSkipWalkthroughPromptVisibility(true);
    
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

    
    

    const GoNextProfile = () => {
        if(user !== undefined && user.skateProfiles !== undefined && currentSkateProfile !== undefined)
        {
            const currentIndex = user.skateProfiles.indexOf(currentSkateProfile);
            dispatch(setCurrentSkateProfile(user.skateProfiles[(currentIndex + 1) % user.skateProfiles.length]))
        }
    }

    const GoPreviousProfile = () => {
        if(user !== undefined && user.skateProfiles !== undefined && currentSkateProfile !== undefined)
        {
            const currentIndex = user.skateProfiles.indexOf(currentSkateProfile);
            if(currentIndex == 0)
                dispatch(setCurrentSkateProfile(user.skateProfiles[user.skateProfiles.length - 1]))
            else dispatch(setCurrentSkateProfile(user.skateProfiles[(currentIndex - 1) % user.skateProfiles.length]))
        }
    }

    const getTopPart = () => {
        return(
        <View style={{flexDirection: 'row'}}>
            <Pressable onPress={GoPreviousProfile}>
                <SvgView size="small">
                    <LeftArrowSvg></LeftArrowSvg>
                </SvgView>
            </Pressable>
            <Text variant="headlineMedium">{currentSkateProfile?.skatePracticeStyle}</Text>
            <Pressable onPress={GoNextProfile}>
                <SvgView size="small">
                    <RightArrowSvg></RightArrowSvg>
                </SvgView>
            </Pressable>
        </View>
        )
    }
    return(
        <View style={[StyleSheet.absoluteFill, SpacingStyles.centeredContainer, {padding: '5%', backgroundColor: 'theme.colors.background'}]}>
            {getTopPart()}
            <TourGuideZone zone={1} text={`You can add an event for skating on your city streets ${SMILING_FACE_WITH_SUNGLASSES}`}>
                <AddAggresiveSkatingEvent onPress={() => navigation.navigate("CreateEvent" as never)}></AddAggresiveSkatingEvent>
            </TourGuideZone>
            {
                currentSkateProfile !== undefined && events !== null && events !== undefined && events.length > 0 ? (
                    <ScrollView style={{margin: '3%'}}>
                        {
                        events.map((evnt) => {
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
                    <PrimaryContainer styleInput={{marginVertical: scale(20), paddingTop: scale(50)}}>    
                        <Text style={{textAlign:"center"}} variant="headlineSmall">We are constantly looking for events for you</Text>
                        <Text style={{textAlign:"center", marginTop: scale(7)}}variant="bodySmall">No skaters you'd like so far anyway</Text>
                        <View style={{height: 250, width: 300}}>
                            <SearchingSvg></SearchingSvg>
                        </View>
                    </PrimaryContainer>
                )
            }
            {uiUtils.getShowWalkthroughModal(skipWalkthroughPromptVisibility, (visibility) => setSkipWalkthroughPromptVisibility(visibility),
                                                () => dispatch(setEventsWalkthrough(false)))}
        </View>
    );
};

export default EventsBody;


