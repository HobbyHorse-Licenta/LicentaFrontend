import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Dimensions, Image, Pressable} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import { Text, useTheme } from 'react-native-paper';

import Button from './Button';
import { CustomTrail, Event, SkateProfile, User } from '../../types';
import { SpacingStyles } from '../../styles';
import EventInfoDisplay from '../events/EventInfoDisplay';
import { defaultEventUrl } from '../../assets/imageUrls'
import { filterUtils, resourceAccess, uiUtils, validation } from '../../utils';
import { Fetch } from '../../services';
import ProfilePicList from './ProfilePicList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { uiSlice } from '../../redux/ui';
import { AggresiveEventInfoDisplay } from '../events';
import { setNeedsEventsRefresh, setNeedsRecommendedEventsRefresh } from '../../redux/appState';
import eventUtils from '../../utils/EventUtil';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const computeTextFontSize = (size: number) => {
    const res = verticalScale(size);
    if(res <= 13)
    {
        return 13;
    }
    else return res;
}

interface EventInput {
    onPress?: Function,
    event: Event,
    joined: boolean

}

const AggresiveEventCard = ({event, onPress, joined}: EventInput) => {
    
    const customTrail : CustomTrail = event.outing.trail as CustomTrail;
    
    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });

    const dispatch = useDispatch();
    
    const [recommendedUsersImagesUrl, setRecommendedUsersImagesUrl] = useState<Array<string | undefined> | undefined>();
    const [recommendedSkateProfiles, setRecommendedSkateProfiles] = useState<Array<SkateProfile>>();
    const [participatingUsersImagesUrl, setParticipatingUsersImagesUrl] = useState<Array<string | undefined> | undefined>();
    const [participatingSkateProfiles, setParticipatingSkateProfiles] = useState<Array<SkateProfile>>();
    const {JWTTokenResult} = useSelector((state: RootState) => state.appState)
    const {currentSkateProfile} = useSelector((state: RootState) => state.globalState)
    
    useEffect(() => {

      if(currentSkateProfile !== undefined)
      {
        if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
        {
            Fetch.getSuggestedSkateProfilesForEvent(JWTTokenResult.token, event.id,
                (skateProfiles) => setRecommendedSkateProfiles(filterUtils.excludeSkateProfile(skateProfiles, currentSkateProfile)),
                () => uiUtils.showPopUp("Error", "Database is not working\nWe couldn't suggested skaters"));
        
            Fetch.getSkateProfilesForEvent(JWTTokenResult.token, event.id,
                (skateProfiles) => setParticipatingSkateProfiles(skateProfiles),
                () => uiUtils.showPopUp("Error", "Database is not working\nWe couldn't participating skaters"));
        }
        else{
            //TODO refresh token
        }
      }
    }, []);

    const theme = useTheme();

    useEffect(() => {
    const subscription = Dimensions.addEventListener(
        'change',
        ({window, screen}) => {
        setDimensions({window, screen});
        },
    );
    return () => subscription?.remove();
    });

    useEffect(() => {
        if(recommendedSkateProfiles !== undefined && recommendedSkateProfiles.length > 0)
        {
            setRecommendedUsersImagesUrl(getAllPicturesFromSkateProfiles(recommendedSkateProfiles));
        }
    }, [recommendedSkateProfiles])

    useEffect(() => {
        if(participatingSkateProfiles !== undefined && participatingSkateProfiles.length > 0)
        {
            setParticipatingUsersImagesUrl(getAllPicturesFromSkateProfiles(participatingSkateProfiles));
        }
    }, [participatingSkateProfiles])
    
    const eventOwner = eventUtils.isOwnerOfEvent(event, currentSkateProfile);

    const getAllPicturesFromSkateProfiles = (skateProfiles: Array<SkateProfile>): Array<string | undefined> =>
    {
        let userArray: Array<User> = [];
        skateProfiles.forEach(skateProfile => skateProfile.user !== undefined && userArray.push(skateProfile.user));
        if(userArray !== undefined)
           return getAllPicturesFromUsers(userArray);
        return [];   
    }

    const getAllPicturesFromUsers = (users: Array<User>): Array<string | undefined> => {
        return users.map((user) => {
            if(user.profileImageUrl !== undefined && user.profileImageUrl !== null)
                return user.profileImageUrl;
            else return undefined;
        });
    }

    function joinEvent(){
        eventUtils.joinEvent(currentSkateProfile, JWTTokenResult, event.id,
            () => {console.log("\n\nEvent joined SUCCESSFULLY"); dispatch(setNeedsEventsRefresh(true));
                            dispatch(setNeedsRecommendedEventsRefresh(true));},
            () => console.log("\n\nEvent join FAILED"));
    }

    function leaveEvent(){
        eventUtils.leaveEvent(currentSkateProfile, JWTTokenResult, event.id,
            () => {console.log("\n\nEvent left SUCCESSFULLY"); dispatch(setNeedsEventsRefresh(true)); dispatch(setNeedsRecommendedEventsRefresh(true))},
            () => console.log("\n\nEvent left FAILED"))
    }

    function deleteEvent(){
        eventUtils.deleteEvent(JWTTokenResult, event.id,
            () => {console.log("\n\nEvent deleted SUCCESSFULLY"); dispatch(setNeedsEventsRefresh(true)); dispatch(setNeedsRecommendedEventsRefresh(true));},
            () => console.log("\n\nEvent delete FAILED"))
    }

    return(
        <Pressable onPress={() => (onPress != undefined) ? onPress() : console.log("[EventCard]: no action on press")}
        style={[styles.container]}>
                <Text variant="headlineSmall">{event.name}</Text>
                <AggresiveEventInfoDisplay event={event}></AggresiveEventInfoDisplay>
                {
                    joined === false ? (
                        <View style={{width:'80%', margin: '1%'}}>
                            <Button style={{backgroundColor: theme.colors.secondary}} text='Join' onPress={joinEvent}></Button>
                        </View> 
                    ):
                    (
                        <View>
                            {eventOwner === true &&
                            <View style={{width:'80%', margin: '1%'}}>
                                <Button style={{backgroundColor: theme.colors.secondary}} text='Delete' onPress={deleteEvent}></Button>
                            </View>
                            }
                            {eventOwner === false &&
                            <View style={{width:'80%', margin: '1%'}}>
                                <Button style={{backgroundColor: theme.colors.secondary}} text='Leave' onPress={leaveEvent}></Button>
                            </View>
                            }
                        </View>
                         
                    )
                }
                
                <View style={{width:'80%', margin: '2%', alignSelf: 'center'}}>
                    <ProfilePicList imageUrlsArray={participatingUsersImagesUrl} grayedOutImageUrlsArray={recommendedUsersImagesUrl}></ProfilePicList>
                </View>
        </Pressable>
    );
};

export default AggresiveEventCard;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: "100%", 
        alignSelf: 'center',
        margin: '2%',
        padding: '2%',
        backgroundColor: 'white',
        borderRadius: 15

    },
    roundness: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15
    },
    rightRoundness: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    leftRoundness: {
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
    },
    rightSide: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        width:'60%',
        height:'100%',
        paddingRight: '3%',
        paddingTop:'3%',
        paddingBottom: '3%'
    }
});