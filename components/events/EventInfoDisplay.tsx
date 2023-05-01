import React from "react";
import { StyleSheet, View } from "react-native";

import { Text, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";

import { SpacingStyles } from "../../styles";
import { Event } from "../../types";
import SvgView from "../general/SvgView";
import { BigLocationSvg, LevelSvg } from "../svg/general";

interface EventInput {
    event: Event
}
const EventInfoDisplay = ({event}: EventInput) => {

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
                    <SvgView size='tiny'>
                        <BigLocationSvg color={theme.colors.onPrimary}></BigLocationSvg>
                    </SvgView>
                    <Text style={[styles.descriptionText, {color: theme.colors.tertiary}]}>{event.outing.trailType}</Text>
                </View>
            </View>
    );
};

export default EventInfoDisplay;

const styles = StyleSheet.create({
    descriptionView: {
        width:'80%',
        padding: '6%',
        flex: 3,
        alignItems: 'flex-end'
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