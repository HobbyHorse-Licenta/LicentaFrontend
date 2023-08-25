import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from "react-native";

import { Text, useTheme } from "react-native-paper";

import { SpacingStyles } from "../../styles";
import { uiUtils } from '../../utils';
import { SvgView } from '../general';
import { Event, ParkTrail } from '../../types';
import { BigLocationSvg, LevelSvg } from '../svg/general';
import { scale, verticalScale } from 'react-native-size-matters';
import { assert } from 'console';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../assets/colors/colors';

interface Input {
    event: Event,
    isRecommendedEvent: boolean
}
const EventMarkerCallout = ({event, isRecommendedEvent} : Input) => {

    const [isParkTrail, setIsParkTrail] = useState(false);
    const [parkTrail, setParkTrail] = useState<ParkTrail | undefined>(undefined);

    
    useEffect(() => {
        const parkTrail = (event.outing.trail as ParkTrail);
        if(parkTrail !== undefined)
        {
            setIsParkTrail(true);
            setParkTrail(parkTrail);
        }
    }, [])
    
    console.log("IS PARK TRAIL: " + parkTrail !== undefined);
    const theme = useTheme();
    return(
        <View style={[ styles.descriptionView, SpacingStyles.centeredContainer]}>
                
                <Text variant='bodyLarge'>{event.name}</Text>
                <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                    <SvgView size='small'>
                        <LevelSvg></LevelSvg>
                    </SvgView>
                    <Text style={[styles.descriptionText, {color: theme.colors.tertiary}]}>{event.skateExperience}</Text>
                </View>

                <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                    <Text style={[styles.descriptionText]}>{uiUtils.getTimeRange(event.outing.startTime, event.outing.endTime)}</Text>
                </View>

                <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                    <Text style={[styles.descriptionText]}>Days: </Text>
                    {
                        event.outing.days.map((dayObject, index) => {
                            
                            return(
                                <View style={{flexDirection: 'row'}}>
                                    { index !== 0 && <Text key={index} style={[styles.descriptionText]}>, </Text>}
                                    <Text key={index} style={[styles.descriptionText]}>{dayObject.dayOfMonth}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                    <Text style={[styles.descriptionText]}>
                        Age range: {event.minimumAge} - {event.maximumAge}</Text>
                </View>

                <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                    <Text style={[styles.descriptionText]}>Gender: {event.gender}</Text>
                </View>
                {isParkTrail === true && parkTrail !== undefined &&
                    <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                        <SvgView size='tiny'>
                            <BigLocationSvg color={theme.colors.onPrimary}></BigLocationSvg>
                        </SvgView>
                        <Text style={[styles.descriptionText, {color: theme.colors.tertiary}]}>{parkTrail.name}</Text>
                    </View>
                }
                { isRecommendedEvent === true &&
                    <TouchableOpacity style={{backgroundColor:COLORS.aBackground, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10}}
                    onPress={() => console.log('Join Event')}>
                        <Text>Join</Text>
                    </TouchableOpacity>
                }
            </View>
    )
}

export default EventMarkerCallout;

const styles = StyleSheet.create({
    descriptionView: {
        width:250,
        height: 280,
        padding: '6%',
        flex: 3,
        alignItems: 'flex-end',
        backgroundColor: "white",
        borderRadius: 20
    },
    descriptionText: {
        fontSize: verticalScale(10) < 10 ? 10 : verticalScale(10),
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: scale(4),
        paddingHorizontal: scale(7)
    }
})