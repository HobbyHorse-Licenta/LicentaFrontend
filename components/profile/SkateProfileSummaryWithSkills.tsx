import React, { useEffect, useState } from "react";
import {StyleSheet, View} from 'react-native'

import uuid from 'react-native-uuid';
import {Text, useTheme} from 'react-native-paper'
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Fetch } from "../../services";
import { SpacingStyles } from "../../styles";
import { uiUtils } from "../../utils";

import { AssignedSkill, MasteringLevel, RenderElement, SkateProfile, Skill, SkillRecommendation } from "../../types";
import { PrimaryContainer, SelectionListModal, Tile, TileList } from "../general";
import AssignedSkillList from "./AssignedSkillList";
import { addAssignedSkill } from "../../redux/appState";

interface Input{
    skateProfileId: string
}


const SkateProfileSummaryWithSkills = ({skateProfileId}: Input) => {
    
    const {user} = useSelector((state: RootState) => state.appState)
    let profileInfo = user?.skateProfiles.find((skateProfile) => skateProfile.id === skateProfileId)

    const [recommendedSkills, setRecommendedSkills] = useState<Array<SkillRecommendation> | undefined>(undefined);
    const [addSkillModalVisible, setAddSkillModalVisible] = useState(false);
    const dispatch = useDispatch();
    
    const removeAssignedSkillsFromRecommendations = (recomSkills: Array<SkillRecommendation> | undefined) => {
        //all recommended skills that are not already assigned to the skateprofile
        return recomSkills?.filter((recommendedSkill) => 
        {
            if(profileInfo !== undefined && profileInfo.assignedSkills !== undefined && profileInfo.assignedSkills !== null)
            {
                if( profileInfo.assignedSkills.find(assignedSkill =>  assignedSkill.skill.id === recommendedSkill.skill.id) !== undefined)
                return false;
                else return true;
            }
            return true;
        })
    }

    useEffect(() => {
        if(profileInfo !== undefined)
        {
            ///get recomended skills for the skateProfile shown in modal
            if(recommendedSkills !== undefined)
            {
                setRecommendedSkills((prev) => removeAssignedSkillsFromRecommendations(prev))
            }
            else {
                Fetch.getSkillRecommendations(profileInfo.skatePracticeStyle, profileInfo.skateExperience,
                (skills) => setRecommendedSkills(removeAssignedSkillsFromRecommendations(skills)),
                () => console.log("Coudn't get recommended skills for the shown profile"))
            }
        }
        else {
            setRecommendedSkills(undefined)
        }
    }, [profileInfo])

    const getAssignedSkillsAsTextArray = () => 
    {
        if(profileInfo !== null && profileInfo !== undefined && profileInfo.assignedSkills !== undefined && profileInfo.assignedSkills !== null)
        {
            return profileInfo.assignedSkills.map((assignedSkill) => {
                return(<Text>{assignedSkill.skill.name}</Text>)
            })
        }
        else return null;
        
    }

    const addNewSkillToProfile = () =>{
       setAddSkillModalVisible(true);
    }

    const addSkill = (recommendedSkill: SkillRecommendation) =>
    {
        if(profileInfo !== undefined)
        {
            // //add recommended skill to assigned skills in curent skate profile, mastering level should be begginer
            const newAssignedSkill: AssignedSkill = {
                id: uuid.v4().toString(),
                skateProfileId: profileInfo.id,
                skill: recommendedSkill.skill,
                masteringLevel: MasteringLevel.Novice
            }

            //TODO: make it so it updates just the assigned skill and after that use dispatch to update the skill with the value returned from fetch
            if(user !==  undefined)
                Fetch.postAssignedSkill(newAssignedSkill, () => console.log("Posted assigned skill succesfully"), () => console.log("Coudn't post assigned skill"))

            dispatch(addAssignedSkill(newAssignedSkill));
        }
        setAddSkillModalVisible(false);
    }

    const getRecommendedSkillsElements = () => {
        if(recommendedSkills !== undefined && recommendedSkills.length > 0)
        {
            return recommendedSkills.map((recommendedSkill, index) => {
                return {
                    id: index,
                    element: <Tile key={index} onPress={() => addSkill(recommendedSkill)}>
                                <Text>
                                {recommendedSkill.skill.name}
                                </Text>
                             </Tile>
                }
            })
        }
    }

    const getStyle = () => {
       return {...{backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary}}
    }
    const theme = useTheme();
    return(
        <PrimaryContainer
        styleInput={getStyle()}>
            {
                profileInfo !== undefined &&
                <View style={SpacingStyles.centeredContainer}>
                    <Text variant='labelSmall'>{profileInfo.skateType}</Text>
                    <Text variant='labelSmall'>{profileInfo.skatePracticeStyle}</Text>
                    <Text variant='labelSmall'>{profileInfo.skateExperience}</Text>
                    <View style={styles.skillsContainer}>
                        <AssignedSkillList skateProfileId={profileInfo.id} onPressAddSkill={() => addNewSkillToProfile()}></AssignedSkillList>
                    </View>
                    {
                        recommendedSkills !== undefined && recommendedSkills.length > 0 &&
                        <SelectionListModal visible={addSkillModalVisible}
                        list={getRecommendedSkillsElements()}></SelectionListModal>
                    }
                </View>
            }
        </PrimaryContainer>
    );
}

export default SkateProfileSummaryWithSkills;

const styles = StyleSheet.create({
    skillsContainer: {
        margin: scale(10)
    }
})