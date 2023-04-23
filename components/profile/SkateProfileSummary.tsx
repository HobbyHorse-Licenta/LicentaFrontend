import React from "react";
import {StyleSheet} from 'react-native'

import {Text, useTheme} from 'react-native-paper'
import { scale, verticalScale } from "react-native-size-matters";
import { SpacingStyles } from "../../styles";

import { SkateProfile } from "../../types";
import { PrimaryContainer } from "../general";

interface Input{
    info: SkateProfile,
    selected: boolean,
}
const SkateProfileSummary = ({info, selected}: Input) => {

    const getStyle = () => {
        if(selected === true)
        {
            return {...SpacingStyles.skateProfileSummary,...{backgroundColor: theme.colors.tertiary, borderColor: theme.colors.tertiary}}
        }
        else return {...SpacingStyles.skateProfileSummary,...{backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary}}
    }
    const theme = useTheme();
    return(
        <PrimaryContainer
        styleInput={getStyle()}>
            <Text variant='labelSmall'>{info.skateType}</Text>
            <Text variant='labelSmall'>{info.skatePracticeStyle}</Text>
            <Text variant='labelSmall'>{info.skateExperience}</Text>
        </PrimaryContainer>
    );
}

export default SkateProfileSummary;
