import React, { useEffect, useState } from 'react'
import {View, StyleSheet, ScrollView, Pressable} from 'react-native'

import {Text, useTheme } from 'react-native-paper'
import { scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { setAddingSkateProfile, setCurrentSkateProfile } from '../../redux/appState';

import { SpacingStyles } from '../../styles';
import { SkateProfile } from '../../types';
import { GeneralModal, PrimaryContainer, SvgView } from '../general';
import { PlusSvg } from '../svg/general';
import SkateProfileSummary from './SkateProfileSummary';
import SkateProfileSummaryWithSkills from './SkateProfileSummaryWithSkills';

interface Input {
    profiles: Array<SkateProfile>,
    onChange?: Function,
}
const SkateProfiles = ({profiles, onChange} : Input) => {
    const {currentSkateProfile} = useSelector((state: any) => state.appState);
    const [skateProfiles, setSkateProfiles] = useState<Array<SkateProfile>>(profiles);
    const [selectedSkateProfile, setSelectedSkateProfile] = useState<SkateProfile>();
    const theme = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        setSkateProfiles(profiles);
        //setSkateProfiles([...profiles, ...profiles])
    }, [profiles])

    
    const getModalInfo = () =>{
        if(selectedSkateProfile !== undefined)
        {
            return(
                <SkateProfileSummaryWithSkills info={selectedSkateProfile}></SkateProfileSummaryWithSkills>
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
                skateProfiles != undefined &&
                <View style={{height: SpacingStyles.skateProfileSummary.height + verticalScale(20)}}>
                    <ScrollView style={{margin: scale(5)}} horizontal={true}
                    >
                        <Pressable onPress={() => addNewSkateProfile()}>
                            <PrimaryContainer
                            styleInput={{...SpacingStyles.skateProfileSummary, ...{backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary}}}>
                                <SvgView size='small'>
                                    <PlusSvg></PlusSvg>
                                </SvgView>
                                
                            </PrimaryContainer>
                        </Pressable>
                        {skateProfiles.map((skateProfile, index) => {
                            return(
                            <Pressable onLongPress={() => {console.log("smth"); setSelectedSkateProfile(skateProfile)}} key={index} onPress={() => dispatch(setCurrentSkateProfile(skateProfile))}>
                                    <SkateProfileSummary selected={checkIfSelected(currentSkateProfile, skateProfile)} 
                                    key={index} info={skateProfile}></SkateProfileSummary>
                            </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>
            }
            <GeneralModal visible={selectedSkateProfile !== undefined} onDismiss={() => {setSelectedSkateProfile(undefined)}}>
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