import React, {useState} from 'react'
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { AssignedSkill, MasteringLevel } from '../../types';
import { PlusSvg } from '../svg/general';

import Tile from '../general/Tile'
import { uiUtils } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Fetch } from '../../services';
import { deleteAssignedSkill, updateAssignedSkill } from '../../redux/appState';
import { nothing } from 'immer';

interface Input {
    skateProfileId: string,
    onPressAddSkill?: Function,
}
const AssignedSkillList = ({skateProfileId, onPressAddSkill} : Input) => {

    const {user} = useSelector((state: RootState) => state.appState)
    const dispatch = useDispatch();
    let skateProfile = user?.skateProfiles.find((skateProfile) => skateProfile.id === skateProfileId)

    
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

        //TODO: make it so it updates just the assigned skill and after that use dispatch to update the skill with the value returned from fetch
        if(user !==  undefined)
            Fetch.postUser(user, () => console.log("Posted user with updated assigned skill succesfully"), () => console.log("Coudn't post user when updating assigned skill"));

        dispatch(updateAssignedSkill(updatedSkill));
        
    }

    const theme = useTheme();
    return (
        <View style={{flexDirection: 'row'}}>
            <Tile color={theme.colors.tertiary} isIcon={true} onPress={() => onPressAddSkill !== undefined && onPressAddSkill()}>
                    <PlusSvg></PlusSvg>
            </Tile>
            {skateProfile !== undefined && skateProfile.assignedSkills !== undefined && skateProfile.assignedSkills !== null &&
            skateProfile.assignedSkills.map((skill, index) => {
                return(
                    <Tile key={index} 
                    color={uiUtils.getColorBasedOnSkillLevel(skill.masteringLevel)}
                    withBorder={true}
                    deleteEnabled={index === selectedIndex} 
                    onDeleteTile={() => skillDelete(skill)}
                    onPress={() => advanceSkillLevel(skill)}
                    onLongPress={() => setSelectedIndex(index)}>
                        <Text>{skill.skill.name}</Text>
                    </Tile>
                );
            })}
        </View>
    )
};

export default AssignedSkillList;