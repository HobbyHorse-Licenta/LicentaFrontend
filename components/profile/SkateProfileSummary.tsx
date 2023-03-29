import React from "react";
import {StyleSheet} from 'react-native'

import {Text, useTheme} from 'react-native-paper'
import { scale, verticalScale } from "react-native-size-matters";

import { SkateProfile } from "../../types";
import { PrimaryContainer } from "../general";

interface Input{
    info: SkateProfile
}
const SkateProfileSummary = ({info}: Input) => {
    const theme = useTheme();
    return(
        <PrimaryContainer
        styleInput={{...styles.mainContainer,...{backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary}}}>
            <Text variant='labelSmall'>{info.skateType}</Text>
            <Text variant='labelSmall'>{info.skatePracticeStyle}</Text>
            <Text variant='labelSmall'>{info.skateExperience}</Text>
        </PrimaryContainer>
    );
}

export default SkateProfileSummary;

const styles = StyleSheet.create({
    mainContainer: {
        padding: scale(3),
        margin: scale(2),
        height: verticalScale(70),
        width: scale(120),
        borderWidth: 2
    }
});