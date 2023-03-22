import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Dimensions, Image} from 'react-native';

import { verticalScale } from 'react-native-size-matters';
import { useTheme, Text } from 'react-native-paper';

import Button from './Button';
import { EventDescription, Event, SportName } from '../../types';
import { SpacingStyles } from '../../styles';
import EventInfoDisplay from '../events/EventInfoDisplay';
import {basketUrl, defaultEventUrl, tennisUrl} from '../../assets/imageUrls'
import { resourceAccess } from '../../utils';

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

    useEffect(() => {
      if(event.imageUrl == undefined)
        setImageUrl(resourceAccess.getDefaultEventImage(event.description.sport))
      else setImageUrl(event.imageUrl);
    }, [])
    


    const image = {uri: 'https://i.postimg.cc/tR26nKb9/basket.jpg'};
    const theme = useTheme();
    // const basketEventDescription: EventDescription = {
    //     sportLevel: "Begginer",
    //     location: {
    //         id: 'wewq',
    //         name: "Gheorgheni nr. 2",
    //         gpsPoint: {
    //             lat: 43,
    //             long: 23
    //         }
    //     },
    //     note: ""
    // };

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
        <View onTouchEnd={() => (onPress != undefined) ? onPress() : console.log("[EventCard]: no action on press")} 
        style={[styles.container, styles.roundness, {width: computeWidth(), height: computeHeight()}]}>

           <View style={{width:'40%', height:'100%'}}>
                <Image source={{uri: imageUrl}} style={[styles.leftRoundness, {width: '100%', height: '100%', resizeMode: 'cover'}]}></Image>
           </View>

           <View style={[SpacingStyles.centeredContainer, styles.rightSide, {backgroundColor: theme.colors.primary}]}>
                <EventInfoDisplay event={event}></EventInfoDisplay>
                <View style={{width:'80%', flex: 1, margin: '5%'}}>
                    <Button text='Join' callBack={joinEvent}></Button>
                </View>
           </View>

        </View>
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