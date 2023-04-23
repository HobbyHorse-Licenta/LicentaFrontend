import React from "react";
import {StyleSheet, View} from 'react-native'

import {Text, useTheme} from 'react-native-paper'
import { scale, verticalScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SpacingStyles } from "../../styles";

import { SkateProfile } from "../../types";
import { PrimaryContainer, TileList } from "../general";

interface Input{
    info: SkateProfile,
}


const SkateProfileSummaryWithSkills = ({info}: Input) => {

    const {allSkills} = useSelector((state: RootState) => state.appState)

    const getNameOfSkill = (skillId: string) =>
    {
        return allSkills?.find((skill) => skill.id === skillId)?.name;
    }
    const getTextArray = () => 
    {
       // console.log("INFO: " +  JSON.stringify(info));
        if(info !== null && info !== undefined && info.assignedSkills !== undefined && info.assignedSkills !== null)
        {
            return info.assignedSkills.map((assignedSkill) => {
                return(<Text>{getNameOfSkill(assignedSkill.skillId)}</Text>)
            })
        }
        else return null;
        
    }
    const getStyle = () => {
       return {...{backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary}}
    }
    const theme = useTheme();
    return(
        <PrimaryContainer
        styleInput={getStyle()}>
            <Text variant='labelSmall'>{info.skateType}</Text>
            <Text variant='labelSmall'>{info.skatePracticeStyle}</Text>
            <Text variant='labelSmall'>{info.skateExperience}</Text>
            <View style={styles.skillsContainer}>
                <TileList objectsArray={getTextArray()}></TileList>
            </View>
        </PrimaryContainer>
    );
}

export default SkateProfileSummaryWithSkills;

const styles = StyleSheet.create({
    skillsContainer: {
        margin: scale(10)
    }
})