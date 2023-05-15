import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Dimensions, Image, Pressable} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme, Text } from 'react-native-paper';

import Button from './Button';
import { Event, SportName, User } from '../../types';
import { SpacingStyles } from '../../styles';
import EventInfoDisplay from '../events/EventInfoDisplay';
import {basketUrl, blankProfilePictureUrl, defaultEventUrl, tennisUrl} from '../../assets/imageUrls'
import { resourceAccess } from '../../utils';
import { Fetch } from '../../services';
import ProfilePicList from './ProfilePicList';

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

const AggresiveEventCard = ({event, onPress}: EventInput) => {

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });

    const [imageUrl, setImageUrl] = useState<string>(defaultEventUrl);
    const [profileImagesUrl, setProfileImagesUrl] = useState<Array<string | undefined> | undefined>();

    //TODO REMOVE THIS
    useEffect(() => {
      if(event.imageUrl == undefined)
        setImageUrl(resourceAccess.getDefaultSkatingEventImage())
      else setImageUrl(event.imageUrl);

      const getAllPicturesFromUsers = (users: Array<User>) => {
        setProfileImagesUrl(users.map((user) => {
            if(user.profileImageUrl !== undefined && user.profileImageUrl !== null)
                return user.profileImageUrl;
            else return undefined;
        }));
      }
      Fetch.getAllUsers(
        (users) => {getAllPicturesFromUsers(users)},
        () => console.log("Coudn't get all users"));
    }, []);

    useEffect(() => {
        if(event.imageUrl == undefined)
          setImageUrl(resourceAccess.getDefaultSkatingEventImage())
        else setImageUrl(event.imageUrl);
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

    const computeWidth = () => 80/100*dimensions.window.width;
    const computeHeight = () => 25/100*dimensions.window.height;

    const openEventPage = () => {

    }
    function joinEvent(){
        console.log("join event");
        // console.log(propertiesOf<EventDescription>(basketEventDescription))
    }

    function propertiesOf<TObj>(_obj: (TObj | undefined) = undefined) {
        return function result<T extends keyof TObj>(name: T) {
            return name;
        }
    }

    return(
        <Pressable onPress={() => (onPress != undefined) ? onPress() : console.log("[EventCard]: no action on press")}
        style={[styles.container, styles.roundness, {width: scale(280), height: scale(260), alignSelf: 'center'}]}>
            <View style={{width:'40%', height:'100%'}}>
                <Image source={{uri: imageUrl}} style={[styles.leftRoundness, {width: '100%', height: '100%', resizeMode: 'cover'}]}></Image>
            </View>

            <View style={[SpacingStyles.centeredContainer, styles.rightSide, {backgroundColor: theme.colors.primary}]}>
                <EventInfoDisplay event={event}></EventInfoDisplay>
                <View style={{width:'80%', flex: 1, margin: '5%'}}>
                    <Button style={{backgroundColor: theme.colors.secondary}} text='Join' onPress={joinEvent}></Button>
                </View>
                <View style={{width:'80%', flex: 1, margin: '5%', alignSelf: 'center'}}>
                    <ProfilePicList imageUrlsArray={profileImagesUrl}></ProfilePicList>
                </View>
                
            </View>
        </Pressable>
    );
};

export default AggresiveEventCard;

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