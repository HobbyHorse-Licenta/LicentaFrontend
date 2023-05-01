import React, { useEffect, useState } from 'react'
import {View, StyleSheet, ScrollView, Pressable} from 'react-native'

import {Text, useTheme } from 'react-native-paper'
import { scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { setAddingSkateProfile, setCurrentSkateProfile } from '../../redux/appState';
import { Fetch } from '../../services';

import { SpacingStyles } from '../../styles';
import { SkatePracticeStyles, SkateProfile, SkillRecommendation } from '../../types';
import { GeneralModal, PrimaryContainer, SvgView } from '../general';
import { PlusSvg } from '../svg/general';
import SkateProfileSummary from './SkateProfileSummary';
import SkateProfileSummaryWithSkills from './SkateProfileSummaryWithSkills';

interface Input {
    profiles: Array<SkateProfile>,
    value: SkateProfile | undefined,
    onValueChange: Function,
    addEnabled?: boolean,
    holdFeatureEnabled?: boolean,
}
const SkateProfiles = ({profiles, value, onValueChange, addEnabled, holdFeatureEnabled} : Input) => {
    
    const [heldProfile, setHeldProfile] = useState<SkateProfile | undefined>();

    const theme = useTheme();
    const dispatch = useDispatch();

   
    

    const getModalInfo = () =>{
        if(heldProfile !== undefined)
        {
            return(
                <SkateProfileSummaryWithSkills skateProfileId={heldProfile.id}></SkateProfileSummaryWithSkills>
              )
        }
        else return(<Text>No info to display</Text>)
      
    }
  
    const addNewSkateProfile = () => {
        dispatch(setAddingSkateProfile(true));
    }

    const checkIfSelected = (skateProfile1: SkateProfile | undefined, skateProfile2: SkateProfile | undefined) => {
        if(skateProfile1 !== undefined && skateProfile2 !== undefined)
        {
            return skateProfile1.id === skateProfile2.id
        }
        else return false;
    }

    return(
        <PrimaryContainer styleInput={{...styles.mainContainer, ...{height: 'auto'}}}>
        <Text variant='headlineSmall'>Skate Profiles</Text>
            {
                profiles != undefined &&
                <View style={{height: SpacingStyles.skateProfileSummary.height + verticalScale(20)}}>
                    <ScrollView style={{margin: scale(5)}} horizontal={true}
                    >
                        { profiles.length < Object.keys(SkatePracticeStyles).length && addEnabled === true &&
                            <Pressable onPress={() => addNewSkateProfile()}>
                                <PrimaryContainer
                                styleInput={{...SpacingStyles.skateProfileSummary, ...{backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary}}}>
                                    <SvgView size='small'>
                                        <PlusSvg></PlusSvg>
                                    </SvgView>
                                    
                                </PrimaryContainer>
                            </Pressable>
                        }
                        {profiles.map((skateProfile, index) => {
                            return(
                            <Pressable onLongPress={() => {if(holdFeatureEnabled === true){setHeldProfile(skateProfile)}}} key={index} onPress={() => onValueChange(skateProfile)}>
                                    <SkateProfileSummary selected={checkIfSelected(value, skateProfile)} 
                                    key={index} info={skateProfile}></SkateProfileSummary>
                            </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>
            }
            <GeneralModal visible={heldProfile !== undefined} onDismiss={() => {setHeldProfile(undefined)}}>
                {getModalInfo()}
            </GeneralModal>
        </PrimaryContainer>
    );
}

export default SkateProfiles;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(8),
        margin: scale(3)
    }
});