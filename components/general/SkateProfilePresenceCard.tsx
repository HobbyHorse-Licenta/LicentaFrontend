import React, {useState, useEffect} from "react";
import { View, ViewStyle, StyleSheet} from "react-native";

import { Text } from "react-native-paper";
import { scale } from 'react-native-size-matters';


import { Fetch } from "../../services";
import { SpacingStyles } from "../../styles";
import { SkateProfile, User } from "../../types";
import ArrowList from "./ArrowList";
import AssignedSkillElement from "./AssignedSkillElement";
import PrimaryContainer from "./PrimaryContainer";
import RoundPicture from "./RoundPicture";

interface Input {
    skateProfile: SkateProfile,
    inactive?: boolean,
    allUsers: Array<User>,
    cardOpacity?: number
}

const SkateProfilePresenceCard = ({skateProfile, inactive, allUsers, cardOpacity} : Input) =>{

    const [user, setUser] = useState<User>();

    useEffect(() => {
        findUserAndSetIt(allUsers);
    }, [allUsers])

    const getViewStyle = () => {
        const commonStyle: ViewStyle = {padding: scale(10), ...SpacingStyles.centeredContainer}
        if(inactive === true)
        {
            return {...commonStyle,
                    backgroundColor: 'gray',
                    opacity: 0.5
            };
        }
        else return commonStyle;
    }

    const findUserAndSetIt = (users: Array<User>) => {
        users.forEach(user => {
            if(user.id === skateProfile.userId)
            {
                setUser(user);

            }
        });
    }
    const assignedSkillsElements = skateProfile.assignedSkills?.map(assignedSkill => <AssignedSkillElement assignedSkill={assignedSkill}></AssignedSkillElement>)  

    return(
        <PrimaryContainer styleInput={{...SpacingStyles.centeredContainer, height: 150, marginHorizontal: 5, opacity: cardOpacity !== undefined ? cardOpacity : 1}}>
            {
                user !== undefined && user !== null ? (
                    
                <View style={getViewStyle()}>
                    <PrimaryContainer styleInput={styles.pic}>
                        <RoundPicture image={user.profileImageUrl !== undefined && user.profileImageUrl.length !== 0 ? user.profileImageUrl : undefined}></RoundPicture>
                    </PrimaryContainer>
                    <Text style={[{flexWrap: 'nowrap'}]} variant="labelSmall">{user.name}</Text>
                    <Text style={{flexWrap: 'nowrap'}} variant="labelSmall">{skateProfile.skateExperience}</Text>
                    {
                        skateProfile !== undefined && skateProfile.assignedSkills !== undefined && skateProfile.assignedSkills.length > 0 &&
                        assignedSkillsElements !== undefined &&
                        <ArrowList itemsToDisplay={assignedSkillsElements}></ArrowList>
                    }
                </View>
                ):(
                    <View></View>
                )
                
            }
        </PrimaryContainer>
    );
}

export default SkateProfilePresenceCard;

const styles = StyleSheet.create({
    pic: {
        height: 30,
        width: 30,
        margin: scale(1),
        padding: scale(1)
    }
})