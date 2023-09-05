import React, { useEffect, useState } from "react";
import {Dimensions, ScrollView, StyleSheet, useWindowDimensions, View, ViewStyle} from 'react-native'

import uuid from 'react-native-uuid';
import {Text, useTheme} from 'react-native-paper'
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { nothing } from "immer";

import { RootState } from "../../redux/store";
import { Fetch } from "../../services";
import { SpacingStyles } from "../../styles";
import { uiUtils, validation } from "../../utils";
import QuestionModal from '../general/QuestionModal'
import { AssignedSkill, MasteringLevel, SkillRecommendation } from "../../types";
import { PrimaryContainer, SelectionListModal, Tile} from "../general";
import AssignedSkillList from "./AssignedSkillList";
import { addAssignedSkill, backupUser, revertChangesInUser } from "../../redux/appState";

interface Input{
    skateProfileId: string
}
const windowWidth = Dimensions.get('window').width;

const SkateProfileSummaryWithSkills = ({skateProfileId}: Input) => {
    
    const {user, JWTTokenResult} = useSelector((state: RootState) => state.appState)
    let profileInfo = user?.skateProfiles.find((skateProfile) => skateProfile.id === skateProfileId)

    const [recommendedSkills, setRecommendedSkills] = useState<Array<SkillRecommendation> | undefined>(undefined);
    const [addSkillModalVisible, setAddSkillModalVisible] = useState(false);
    const dispatch = useDispatch();
    
    

    useEffect(() => {
        if(profileInfo !== undefined)
        {
            ///get recomended skills for the skateProfile shown in modal
            if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
            {
                Fetch.getSkillRecommendations(JWTTokenResult.token,
                    profileInfo.skatePracticeStyle, profileInfo.skateExperience,
                    (skills) => setRecommendedSkills(removeAssignedSkillsFromRecommendations(skills)),
                    () => console.log("Coudn't get recommended skills for the shown profile"))
                
            }
            else{
                //TODO refresh token
            }
        }
        else {
            setRecommendedSkills(undefined)
        }
    }, [profileInfo, user])

    const removeAssignedSkillsFromRecommendations = (recomSkills: Array<SkillRecommendation> | undefined) => {
        //all recommended skills that are not already assigned to the skateprofile
        return recomSkills?.filter((recommendedSkill) => 
        {
            if(profileInfo !== undefined && profileInfo.assignedSkills !== undefined && profileInfo.assignedSkills !== null)
            {
                if( profileInfo.assignedSkills.find(assignedSkill => assignedSkill.skill !== undefined && assignedSkill.skill.id === recommendedSkill.skill.id) !== undefined)
                return false;
                else return true;
            }
            return true;
        })
    }

    const addNewSkillToProfile = () =>{
       setAddSkillModalVisible(true);
    }

    const getSystemGuide = () => {
        const masteringLevelValues = Object.values(MasteringLevel);
        return(
            <View style={{alignItems: "center", borderRadius: 20, paddingVertical: scale(15), paddingHorizontal: scale(22)}}>
                <Text variant="headlineSmall" style={{marginBottom: verticalScale(10)}}>System Guide</Text>
                <View>
                    {
                        masteringLevelValues.map((value, index) => {
                            return(
                                <View key={uuid.v4().toString()} style={{flexDirection: 'row', alignItems: "center"}}>
                                    <View style={{marginRight: scale(5), width: 10, height: 10, borderRadius: 50, backgroundColor: uiUtils.getColorBasedOnSkillLevel(value)}}></View>
                                    <Text key={uuid.v4().toString()}>{value}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
        return 
    }

    const addSkill = (recommendedSkill: SkillRecommendation) =>
    {
        if(profileInfo !== undefined)
        {
            // //add recommended skill to assigned skills in curent skate profile, mastering level should be begginer
            const newAssignedSkill: AssignedSkill = {
                id: uuid.v4().toString(),
                skillId: recommendedSkill.skill.id,
                skateProfileId: profileInfo.id,
                masteringLevel: MasteringLevel.Novice
            }

            const skillForOptimisticUpdate: AssignedSkill = {skill: recommendedSkill.skill, ...newAssignedSkill};

            if(user !==  undefined)
            {
                if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
                {
                    //optimistic update
                    dispatch(backupUser());
                    dispatch(addAssignedSkill(skillForOptimisticUpdate));

                    Fetch.postAssignedSkill( JWTTokenResult.token,
                        newAssignedSkill, 
                        (postedAssignedSkill) => console.log("added skill successfully"),
                        () => {uiUtils.showPopUp("Error", "Coudn't add skill to current skating profile"); dispatch(revertChangesInUser())})
                }
                else{
                    //TODO refresh token
                }
            }
                

        }
        setAddSkillModalVisible(false);
    }

    const getRecommendedSkillsElements = () => {
        if(recommendedSkills !== undefined && recommendedSkills.length > 0)
        {
            return recommendedSkills.map((recommendedSkill, index) => {
                return {
                    id: index,
                    element: <Tile key={uuid.v4().toString()} onPress={() => addSkill(recommendedSkill)}>
                                <Text>
                                {recommendedSkill.skill.name}
                                </Text>
                             </Tile>
                }
            })
        }
    }

    const getStyle = () => {
        const style : ViewStyle = {backgroundColor: 'yellow', borderColor: theme.colors.tertiary, width: "100%", height: "100%"}
       return style
    }
    const theme = useTheme();
    return(
        <View>
            {
                profileInfo !== undefined &&
                <View style={SpacingStyles.centeredContainer}>
                    <View style={[SpacingStyles.centeredContainer, {paddingVertical: scale(10), backgroundColor: theme.colors.background, borderRadius: 22}]}>

                        <Text variant='headlineSmall'>Current profile</Text>
                        <Text variant="bodyLarge">{profileInfo.skateType}</Text>
                        <Text variant='bodyLarge'>{profileInfo.skatePracticeStyle}</Text>
                        <Text variant='bodyLarge'>{profileInfo.skateExperience}</Text>
                        <View style={styles.skillsContainer}>
                            <ScrollView horizontal={true} contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
                                <AssignedSkillList skateProfileId={profileInfo.id} onPressAddSkill={() => addNewSkillToProfile()}></AssignedSkillList>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.systemGuideContainer}>
                        {getSystemGuide()}
                    </View>
                    {
                        addSkillModalVisible === true &&
                        <View>
                            {
                                recommendedSkills !== undefined && recommendedSkills.length > 0 ? 
                                (
                                    <SelectionListModal visible={addSkillModalVisible}
                                    list={getRecommendedSkillsElements()}></SelectionListModal>
                                ):
                                (
                                    <QuestionModal question="No recommended event suggestions" button1Text="Ok" onButton1Press={() => setAddSkillModalVisible(false)} onDismiss={() => nothing}
                                    visible={addSkillModalVisible}/>
                                )
                            }
                        </View>
                    }
                </View>
            }
        </View>
        
    );
}
export default SkateProfileSummaryWithSkills;

const styles = StyleSheet.create({
    skillsContainer: {
        margin: scale(10),
        height: scale(100),
        width: scale(200)
    },
    systemGuideContainer: {
        height: scale(180),
        width: scale(200),
    }
})