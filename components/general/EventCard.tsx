import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Dimensions, Image, Pressable} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

import Button from './Button';
import { Event, SkateProfile, User } from '../../types';
import { SpacingStyles } from '../../styles';
import EventInfoDisplay from '../events/EventInfoDisplay';
import { blankProfilePictureUrl, defaultEventUrl } from '../../assets/imageUrls'
import { filterUtils, resourceAccess, validation } from '../../utils';
import { Fetch } from '../../services';
import ProfilePicList from './ProfilePicList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { json } from 'node:stream/consumers';
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

const EventCard = ({event, onPress, joined}: EventInput) => {

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });

    const dispatch =  useDispatch();
    const [imageUrl, setImageUrl] = useState<string>(defaultEventUrl);
    const [recommendedUsersImagesUrl, setRecommendedUsersImagesUrl] = useState<Array<string | undefined> | undefined>();
    const [recommendedSkateProfiles, setRecommendedSkateProfiles] = useState<Array<SkateProfile>>();
    const [participatingUsersImagesUrl, setParticipatingUsersImagesUrl] = useState<Array<string | undefined> | undefined>();
    const [participatingSkateProfiles, setParticipatingSkateProfiles] = useState<Array<SkateProfile>>();
    const [reversed, setReversed] = useState(false);
    const { JWTTokenResult} = useSelector((state: RootState) => state.appState)
    const {currentSkateProfile} = useSelector((state: RootState) => state.globalState)
    
    
    useEffect(() => {
      if(event.imageUrl == undefined || event.imageUrl.length === 0)
        setImageUrl(resourceAccess.getDefaultSkatingEventImage())
      else setImageUrl(event.imageUrl);

      if(currentSkateProfile !== undefined)
      {
        if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
        {
            Fetch.getSuggestedSkateProfilesForEvent(JWTTokenResult.token, event.id,
                (skateProfiles) => setRecommendedSkateProfiles(filterUtils.excludeSkateProfile(skateProfiles, currentSkateProfile)),
                () => console.log("Coudn't get suggested users"));
        
            //user can see himselft if hes participating
            Fetch.getSkateProfilesForEvent(JWTTokenResult.token, event.id,
                (skateProfiles) => setParticipatingSkateProfiles(skateProfiles),
                () => console.log("Coudn't get participating users"));
            }
        }
        else{
            //TODO refresh token
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

    return(
        <Pressable onPress={() => (onPress != undefined) ? onPress() : console.log("[EventCard]: no action on press")}
        style={[styles.container, {alignSelf: 'center'}, SpacingStyles.eventCard]}>
            {
                reversed === false ? 
                (
                    <View style={{width: "100%", height: "100%", flexDirection: "row"}}>

                        <View style={{width:'40%', height:'100%'}}>
                            <Image source={{uri: imageUrl}} style={[styles.leftRoundness, {width: '100%', height: '100%', resizeMode: 'cover'}]}></Image>
                        </View>

                        <View style={[SpacingStyles.centeredContainer, styles.rightSide, {backgroundColor: theme.colors.primary}]}>
                            <EventInfoDisplay event={event}></EventInfoDisplay>
                            {
                                joined === false ? (
                                    <View style={{width:'80%', margin: '5%'}}>
                                        <Button style={{backgroundColor: theme.colors.secondary}} text='Join' onPress={joinEvent}></Button>
                                    </View>
                                )
                                :(
                                    <View style={{width:'80%', margin: '5%'}}>
                                        <Button style={{backgroundColor: theme.colors.secondary}} text='Leave' onPress={leaveEvent}></Button>
                                    </View>
                                )
                            }
                    
                            <View style={{width:'80%', margin: '5%', alignSelf: 'center'}}>
                                <ProfilePicList imageUrlsArray={participatingUsersImagesUrl} grayedOutImageUrlsArray={recommendedUsersImagesUrl}></ProfilePicList>
                            </View>  
                        </View>

                    </View>                   
                ):
                (
                    <View style={{width:'80%', margin: '5%'}}>
                        <Button style={{backgroundColor: theme.colors.secondary}} text='Delete' onPress={leaveEvent}></Button>
                    </View>
                )
            }
            
                
          
        </Pressable>
    );
};

export default EventCard;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: '2%',
        backgroundColor: 'white'

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