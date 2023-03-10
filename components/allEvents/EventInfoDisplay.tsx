import React from "react";
import { StyleSheet, View } from "react-native";

import { Text, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";

import { SpacingStyles } from "../../styles";
import { Event } from "../../types";
import SmallSvgView from "../general/SmallSvgView";
import { BigLocationSvg, LevelSvg, LocationSvg } from "../svg/general";

interface EventInput {
    event: Event
}

const EventInfoDisplay = ({event}: EventInput) => {

    const theme = useTheme();
    return(
            <View style={[ styles.descriptionView, SpacingStyles.centeredContainer]}>
                
                <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                    <SmallSvgView>
                        <LevelSvg></LevelSvg>
                    </SmallSvgView>
                    <Text style={styles.descriptiomText}>{event.level}</Text>
                </View>
                
                <View style={[styles.rowContainer, {backgroundColor: theme.colors.background}]}>
                    <SmallSvgView>
                        <BigLocationSvg color={theme.colors.onPrimary}></BigLocationSvg>
                    </SmallSvgView>
                    <Text style={styles.descriptiomText}>{event.location}</Text>
                </View>
                
                {/* <Text style={styles.descriptiomText}>Friendly basketball game in Gheorgheni Park. Level: Begginers, Address: Strada Gheorgheni nr. 5
                Friendly basketball game in Gheorgheni Park. Level: Begginers, Address: Strada Gheorgheni nr. 5 dsadsadas
                </Text> */}
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
    descriptiomText: {
        fontSize: verticalScale(10) < 10 ? 10 : verticalScale(10),
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: scale(4),
        padding: scale(3)
    }
})