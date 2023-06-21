import React, {useState, useEffect} from 'react'
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { AssignedSkill, MasteringLevel } from '../../types';
import { PlusSvg } from '../svg/general';

import Tile from '../general/Tile'
import { uiUtils, validation } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Fetch } from '../../services';
import { backupUser, deleteAssignedSkill, revertChangesInUser, updateAssignedSkill } from '../../redux/appState';
import { nothing } from 'immer';

interface Input {
    skateProfileId: string,
    onPressAddSkill?: Function,
}
const AssignedSkillList = ({skateProfileId, onPressAddSkill} : Input) => {

    const {user, JWTTokenResult} = useSelector((state: RootState) => state.appState)
    const dispatch = useDispatch();
    let skateProfile = user?.skateProfiles.find((skateProfile) => skateProfile.id === skateProfileId)

    useEffect(() => {
      dispatch(backupUser());
    }, [])
    


    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
    
    const getNextValue = (currentValue: string): string | undefined => {
        const keys = Object.keys(MasteringLevel);
        const currentIndex = keys.indexOf(currentValue);
        const nextIndex = currentIndex + 1;
        const nextKey = keys[nextIndex];
        return nextKey ? MasteringLevel[nextKey] : undefined;
    }

    const skillDelete = (skill: AssignedSkill) => {
        dispatch(deleteAssignedSkill(skill.id))
    }

    const advanceSkillLevel = (skill: AssignedSkill) => {
        const nextSkillLevel = getNextValue(skill.masteringLevel);
        let newMasteringLevel;
        if(nextSkillLevel === undefined)
            newMasteringLevel = MasteringLevel.Novice;
        else newMasteringLevel = nextSkillLevel as MasteringLevel;

        const updatedSkill: AssignedSkill = {
            ...skill,
            masteringLevel: newMasteringLevel
        }

        //optimistic UI update
        dispatch(updateAssignedSkill(updatedSkill))

        //if one of this fails the state is reseted
        if(user !==  undefined)
        {
            if(JWTTokenResult !== undefined && !validation.isJWTTokenExpired(JWTTokenResult))
            {
                Fetch.putAssignedSkill(JWTTokenResult.token,
                    updatedSkill,
                    (putUpdatedSkill) => nothing,
                    () =>{dispatch(revertChangesInUser()), uiUtils.showPopUp("Error", "Couldn't update skill level in profile")})
            }
            else{
                //TODO refresh token
            }
        }
    }

    const theme = useTheme();
    return (
        <View style={{flexDirection: 'row'}}>
            <Tile color={theme.colors.tertiary} isIcon={true} onPress={() => onPressAddSkill !== undefined && onPressAddSkill()}>
                    <PlusSvg></PlusSvg>
            </Tile>
            {skateProfile !== undefined && skateProfile.assignedSkills !== undefined && skateProfile.assignedSkills !== null &&
            skateProfile.assignedSkills.map((assignedSkill, index) => {
                return(
                    <Tile key={index} 
                    color={uiUtils.getColorBasedOnSkillLevel(assignedSkill.masteringLevel)}
                    withBorder={true}
                    deleteEnabled={index === selectedIndex} 
                    onDeleteTile={() => skillDelete(assignedSkill)}
                    onPress={() => advanceSkillLevel(assignedSkill)}
                    onLongPress={() => setSelectedIndex(index)}>
                        {
                            assignedSkill.skill !== undefined && assignedSkill.skill !== null &&
                            <Text>{assignedSkill.skill.name}</Text>
                        }
                    </Tile>
                );
            })}
        </View>
    )
};

export default AssignedSkillList;