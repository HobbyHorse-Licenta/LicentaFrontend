import React from 'react'
import {View, ImageBackground, StyleSheet} from 'react-native'

import { scale, verticalScale } from 'react-native-size-matters';
import { Text } from 'react-native-paper';

import { LocationSvg } from '../svg/general';
import { Event } from '../../types';

import { SvgView } from '../general';
import { defaultEventUrl2 } from '../../assets/imageUrls';

interface Input {
    event: Event
}

const EventImage = ({event}: Input) => {

    const getImage = () => {
        if(event.imageUrl !== undefined && event.imageUrl.length !== 0)
        {
            return event.imageUrl;
        }
        return defaultEventUrl2;
    }
        //TODO: change location Text
    return(
        <View>
            <ImageBackground source={{uri: getImage()}} resizeMode="cover" style={styles.image}>
                <View style={styles.locationView}>
                    <SvgView size={'small'}>
                        <LocationSvg color='white'></LocationSvg>
                    </SvgView>
                    <Text variant='bodyLarge' style={{color: 'white'}}>{event.outing.trailType}</Text>
                </View>
            </ImageBackground>
            
        </View>
    );
};

export default EventImage;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: verticalScale(300),
        backgroundColor: 'black',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    locationView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: verticalScale(20),
        left: scale(20)
    }
});

