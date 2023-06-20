import React from 'react'
import {View, ImageBackground, StyleSheet} from 'react-native'

import { scale, verticalScale } from 'react-native-size-matters';
import { Text } from 'react-native-paper';

import { FemaleSvg, LocationSvg } from '../svg/general';
import { Event, Gender, ParkTrail, SkatePracticeStyles } from '../../types';

import { SvgView } from '../general';
import { defaultEventUrl2 } from '../../assets/imageUrls';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Input {
    event: Event
}
const EventImage = ({event}: Input) => {
    console.log("event to display: " + JSON.stringify(event));
    const {currentSkateProfile} = useSelector((state: RootState) => state.appState)
    let parkTrail: ParkTrail | undefined = undefined;
    if(currentSkateProfile?.skatePracticeStyle === SkatePracticeStyles.CasualSkating || currentSkateProfile?.skatePracticeStyle === SkatePracticeStyles.SpeedSkating )
    {
        parkTrail = event.outing.trail as ParkTrail;
    }
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
                {   parkTrail !== undefined &&
                    <View style={styles.locationView}>
                        <SvgView size={'small'}>
                            <LocationSvg color='white'></LocationSvg>
                        </SvgView>
                        <Text variant='bodyLarge' style={{color: 'white'}}>{parkTrail.name}</Text>
                    </View>
                }
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

