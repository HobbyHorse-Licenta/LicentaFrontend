import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Pressable} from 'react-native';

import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTourGuideController } from 'rn-tourguide';

import { SpacingStyles } from '../../styles';
import { AggresiveEventCard, EventCard, InformationalSvgComponent, LoadingComponent, PrimaryContainer, SvgView } from '../general';
import { Event, SkatePracticeStyles } from '../../types';
import AddAggresiveSkatingEvent from './AddAggresiveSkatingEvent';
import { SMILING_FACE_WITH_SUNGLASSES } from '../../assets/emotes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setEventsWalkthrough } from '../../redux/walkthroughState';
import { Fetch } from '../../services';
import { setAllParkTrails, setCurrentSkateProfile, setNeedsRefresh } from '../../redux/appState';
import SearchingSvg from '../svg/general/SearchingSvg';
import LeftArrowSvg from '../svg/general/LeftArrowSvg';
import RightArrowSvg from '../svg/general/RightArrowSvg';
import { uiUtils } from '../../utils';

const EventsBody = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const {needsRefresh} = useSelector((state: RootState) => state.appState);
    const [loading, setLoading] = useState(false);
    const {walkthroughState} = useSelector((state: RootState) => state)
    const {currentSkateProfile, user} = useSelector((state: RootState) => state.appState)
    const [skipWalkthroughPromptVisibility, setSkipWalkthroughPromptVisibility] = useState(false);
    const [events, setEvents] = useState<Array<Event>>([]);


    useEffect(() => {
    console.log("\n\n\n\nFUCKINGGGG CHNAGED\n\n\n\n")

        getAndSetRecommendedEvents();
    }, [currentSkateProfile])

    useEffect(() => {
        if(needsRefresh === true)
        {
            getAndSetRecommendedEvents();
            dispatch(setNeedsRefresh(false));
        }
    }, [needsRefresh])
    

    useEffect(() => {
        Fetch.getAllParkTrails(
          (parkTrails) => {dispatch(setAllParkTrails(parkTrails));},
          () => uiUtils.showPopUp("Error", "Database is not working\nWe couldn't load the park trails")
        );    
      }, [])

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

    const showWalkthroughModal = () => {setSkipWalkthroughPromptVisibility(true);}
    
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


    const onRefresh = () => {
    setRefreshing(true);
    console.log("REFRESHING");
    // Perform your data fetching or refreshing logic here
    
    // Once the data fetching is complete, set the refreshing state back to false
    setRefreshing(false);
    };

    const getAndSetRecommendedEvents = () => {
        if(currentSkateProfile !== undefined)
        {
            setLoading(true);
            Fetch.getRecommendedEventsForSkateProfile(currentSkateProfile.id,
            (recommendedEvents) => { setEvents(recommendedEvents); setLoading(false); console.log("\n\n\nRecommended events I just got: " + JSON.stringify(recommendedEvents) + "\n\n\n")},
            () => { setEvents([]); setLoading(false); uiUtils.showPopUp("Error", "Database is not working\nWe couldn't load recommended events");});
        }
        else setLoading(false);   
    }
        
    


    const GoNextProfile = () => {
        setLoading(true);
        if(user !== undefined && user.skateProfiles !== undefined && currentSkateProfile !== undefined)
        {
            const currentIndex = user.skateProfiles.indexOf(currentSkateProfile);
            dispatch(setCurrentSkateProfile(user.skateProfiles[(currentIndex + 1) % user.skateProfiles.length]))
        }
    }

    const GoPreviousProfile = () => {
        setLoading(true);
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
                loading ?
                (
                    <PrimaryContainer styleInput={SpacingStyles.eventCard}>
                    <LoadingComponent height={SpacingStyles.eventCard.height} width={SpacingStyles.eventCard.width}></LoadingComponent>
                    </PrimaryContainer>
                ):
                (
                    currentSkateProfile !== undefined && events !== null && events !== undefined && events.length > 0 ? (
                        <ScrollView style={{width: '100%', margin: '0%'}}>
                            {   
                            events.map((evnt) => {
                                if(currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.AggresiveSkating)
                                {
                                    return(
                                        <AggresiveEventCard key={evnt.id} event={evnt} joined={false}
                                        onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></AggresiveEventCard>
                                    )
                                }
                                else return(
                                    <EventCard key={evnt.id} event={evnt} joined={false}
                                    onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></EventCard>
                                );
                            })
                            }
                        </ScrollView>
                    ):(
                            <InformationalSvgComponent
                            headline="We are constantly looking for events for you"
                            body="No skaters you'd like so far anyway"
                            svgElement={<SearchingSvg></SearchingSvg>}
                            />
                            // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} ></RefreshControl>
                    
                        
                    )
                )
            }
            
            {uiUtils.getShowWalkthroughModal(skipWalkthroughPromptVisibility, (visibility) => setSkipWalkthroughPromptVisibility(visibility),
                                                () => dispatch(setEventsWalkthrough(false)))}
        </View>
    );
};

export default EventsBody;


