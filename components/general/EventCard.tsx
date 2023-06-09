import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Dimensions, Image, Pressable} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';

import Button from './Button';
import { Event, SkateProfile, User } from '../../types';
import { SpacingStyles } from '../../styles';
import EventInfoDisplay from '../events/EventInfoDisplay';
import { blankProfilePictureUrl, defaultEventUrl } from '../../assets/imageUrls'
import { resourceAccess } from '../../utils';
import { Fetch } from '../../services';
import ProfilePicList from './ProfilePicList';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { json } from 'node:stream/consumers';

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
    event: Event
}

const EventCard = ({event, onPress}: EventInput) => {

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });

    const [imageUrl, setImageUrl] = useState<string>(defaultEventUrl);
    const [profileImagesUrl, setProfileImagesUrl] = useState<Array<string | undefined> | undefined>();
    const [recommendedSkateProfiles, setRecommendedSkateProfiles] = useState<Array<SkateProfile>>();
    const {currentSkateProfile} = useSelector((state: RootState) => state.appState)
    //TODO REMOVE THIS
    useEffect(() => {
      if(event.imageUrl == undefined || event.imageUrl.length === 0)
        setImageUrl(resourceAccess.getDefaultSkatingEventImage())
      else setImageUrl(event.imageUrl);

      Fetch.getSuggestedSkateProfilesForEvent(event.id,
        (skateProfiles) => setRecommendedSkateProfiles(excludeCurrentSkateProfile(skateProfiles)),
        () => console.log("Coudn't get suggested users"));

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
            //console.log("RECOMNEDE SKATE PROGILES:  " + JSON.stringify(getAllPicturesFromSkateProfiles(recommendedSkateProfiles)));
            setProfileImagesUrl(getAllPicturesFromSkateProfiles(recommendedSkateProfiles));
        }
    }, [recommendedSkateProfiles])
    

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

    const excludeCurrentSkateProfile = (skateProfiles: Array<SkateProfile>) : Array<SkateProfile>  => {
        const filteredSkateProfiles = skateProfiles.filter(skateProfile => skateProfile.id != currentSkateProfile?.id);
        return filteredSkateProfiles;
    }

    function joinEvent(){
        console.log("join event");
        // console.log(propertiesOf<EventDescription>(basketEventDescription))
    }

    // function propertiesOf<TObj>(_obj: (TObj | undefined) = undefined) {
    //     return function result<T extends keyof TObj>(name: T) {
    //         return name;
    //     }
    // }

    return(
        <Pressable onPress={() => (onPress != undefined) ? onPress() : console.log("[EventCard]: no action on press")}
        style={[styles.container, styles.roundness, {width: scale(280), height: scale(400), alignSelf: 'center'}]}>
            <View style={{width:'40%', height:'100%'}}>
                <Image source={{uri: imageUrl}} style={[styles.leftRoundness, {width: '100%', height: '100%', resizeMode: 'cover'}]}></Image>
            </View>

            <View style={[SpacingStyles.centeredContainer, styles.rightSide, {backgroundColor: theme.colors.primary}]}>
                <EventInfoDisplay event={event}></EventInfoDisplay>
                <View style={{width:'80%', margin: '5%'}}>
                    <Button style={{backgroundColor: theme.colors.secondary}} text='Join' onPress={joinEvent}></Button>
                </View>
                <View style={{width:'80%', margin: '5%', alignSelf: 'center'}}>
                    <ProfilePicList imageUrlsArray={profileImagesUrl}></ProfilePicList>
                </View>
                
            </View>
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
    roundness: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15
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