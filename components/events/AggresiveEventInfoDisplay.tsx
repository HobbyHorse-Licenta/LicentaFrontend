import React, {useRef, useState} from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

import uuid from 'react-native-uuid'
import { nothing } from "immer";
import { Text, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";

import { SpacingStyles } from "../../styles";
import { CustomTrail, Event, Location, Outing, ParkTrail } from "../../types";
import { mapsUtils } from "../../utils";
import { PrimaryContainer } from "../general";
import SvgView from "../general/SvgView";
import { BigLocationSvg, LevelSvg } from "../svg/general";

interface EventInput {
    event: Event
}

const containersWidth = scale(290);

const AggresiveEventInfoDisplay = ({event}: EventInput) => {
   
    const customTrail: CustomTrail = (event.outing.trail as CustomTrail);
    
    const theme = useTheme();
    const mapRef = useRef<MapView | null>(null);
    const [centeredLocation, setCenteredLocation] = useState<Location>({
        id: uuid.v4().toString(),
        name: 'Cluj-Napoca',
        lat: 46.770960,
        long:  23.596937
    });

    const getTimeRange = () : string => {
        return `${new Date(event.outing.startTime).getHours()}:${new Date(event.outing.startTime).getMinutes()} - 
        ${new Date(event.outing.endTime).getHours()}:${new Date(event.outing.endTime).getMinutes()}`
    }

    const getMapContainer = () =>{
        return(
            <PrimaryContainer styleInput={styles.mapContainer}>
                
            </PrimaryContainer>
        )
    }

    return(
            <View style={[ styles.descriptionView, SpacingStyles.centeredContainer]}>
                
                <View style={{width: "90%", height: 200}}>
                        {mapsUtils.getUneditableCustomTrailMap(mapRef, centeredLocation, customTrail.checkPoints, () => nothing)}
                </View>

                <View style={{width: "60%",height: 160}}>
                        <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                            <SvgView size='small'>
                                <LevelSvg></LevelSvg>
                            </SvgView>
                            <Text style={[styles.descriptionText, {color: theme.colors.tertiary}]}>{event.skateExperience}</Text>
                        </View>

                        <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                            <Text style={[styles.descriptionText]}>
                                Age range: {event.minimumAge} - {event.maximumAge}</Text>
                        </View>

                        <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                            <Text style={[styles.descriptionText]}>Gender: {event.gender}</Text>
                        </View>

                        <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                            <Text style={[styles.descriptionText]}>{getTimeRange()}</Text>
                        </View>
                    </View>
               
                    
            </View>
    );
};

export default AggresiveEventInfoDisplay;

const styles = StyleSheet.create({
    descriptionView: {
        width: "100%",
        margin: '3%'
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
    },
    mapContainer: {
        margin: scale(20),
        width: 100,
        padding: scale(10)
    },
})
