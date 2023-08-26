import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import {Text, useTheme} from 'react-native-paper'

import { FemaleSvg, MaleAndFemaleSvg, MaleSvg } from '../svg/general';
import { Gender } from '../../types';
import { PrimaryContainer, SvgView } from '../general';
import SelectAgeGap from './SelectAgeGap';
import SelectNumberOfPeople from './SelectNumberOfPeople';
import { useDispatch } from 'react-redux';
import { setGender, setMaximumAge, setMaxNumberOfPeople, setMinimumAge } from '../../redux/createScheduleState';
import { SpacingStyles } from '../../styles';


interface Input {
    selectedGender: Gender | undefined, 
    setSelectedGender: Function,
    numberOfPartners: number | undefined,
    setNumberOfPartners: Function,
    minimumAge?: number | undefined,
    setMinimumAgee: Function,
    maximumAge?: number | undefined,
    setMaximumAgee: Function
}
const SelectCompanion = ({selectedGender, setSelectedGender, numberOfPartners, setNumberOfPartners,
                            minimumAge, setMinimumAgee, maximumAge, setMaximumAgee} : Input) => {
    
    const theme = useTheme();
    const dispatch = useDispatch();

    const [numberOfPeopleSelectorOnTop, setNumberOfPeopleSelectorOnTop] = useState(true);
    
    useEffect(() => {
      dispatch(setGender(selectedGender))
    }, [selectedGender])

    useEffect(() => {
      dispatch(setMaxNumberOfPeople(numberOfPartners))
    }, [numberOfPartners])

    useEffect(() => {
      dispatch(setMinimumAge(minimumAge))
    }, [minimumAge])

    useEffect(() => {
      dispatch(setMaximumAge(maximumAge))
    }, [maximumAge])
    
    
    const selectedFemale = () => {
        if(selectedGender === Gender.Female)
            setSelectedGender(undefined)
        else setSelectedGender(Gender.Female)
    }

    const selectedMale = () => {
        if(selectedGender === Gender.Male)
            setSelectedGender(undefined)
        else setSelectedGender(Gender.Male)
    }

    const selectedMixed = () => {
        if(selectedGender === Gender.Mixed)
            setSelectedGender(undefined)
        else setSelectedGender(Gender.Mixed)
    }

    const getGenderPrefrence = () => {
        return(
            <View style={{flexDirection: 'row'}}>
                <Pressable onPress={selectedFemale}>
                <View style={[styles.iconWithLabel, selectedGender === Gender.Female && {backgroundColor: theme.colors.tertiary}]}>
                    <SvgView size='big'>
                        <FemaleSvg></FemaleSvg>
                    </SvgView>
                    <Text>Female</Text>
                </View>
                </Pressable>
                <Pressable onPress={selectedMale}>
                    <View style={[styles.iconWithLabel, selectedGender === Gender.Male && {backgroundColor: theme.colors.tertiary}]}>                     
                        <SvgView size='big'>
                            <MaleSvg></MaleSvg>
                        </SvgView>
                        <Text>Male</Text>
                    </View>
                </Pressable>
                <Pressable onPress={selectedMixed}>
                    <View style={[styles.iconWithLabel, selectedGender === Gender.Mixed && {backgroundColor: theme.colors.tertiary}]}>
                        <SvgView size='big'>
                            <MaleAndFemaleSvg></MaleAndFemaleSvg>
                        </SvgView>
                        <Text>Mixed</Text>
                    </View>
                </Pressable>
                
            </View>
        );
    }

    

    return(
        <PrimaryContainer styleInput={{padding: scale(10)}}>
            <View style={{marginBottom: scale(25), zIndex: numberOfPeopleSelectorOnTop === true ? 3 : 0}}>
                <Text variant="titleMedium" style={{padding: scale(5)}}>You would go out with maximum:</Text>
                <View style={[SpacingStyles.centeredContainer, {flexDirection: 'row'}]}>
                    <SelectNumberOfPeople inputValue={numberOfPartners !== undefined ? numberOfPartners : null}
                        onOpenOrClose={() => setNumberOfPeopleSelectorOnTop((value) => !value)}
                      onChange={nr => setNumberOfPartners(nr)}></SelectNumberOfPeople>
                    <Text style={{marginLeft: scale(10)}}>skaters</Text>
                </View>
            </View>
        
            <Text variant="titleMedium">Which age gap are you confortable with?</Text>
            <Text variant="titleSmall" style={{marginBottom: scale(7)}}>Skaters aged:</Text>
            <SelectAgeGap minimumAge={minimumAge !== undefined ? minimumAge : null} 
            maximumAge={maximumAge !== undefined ? maximumAge : null} onMinimumAgeChange={(age) => setMinimumAgee(age)}
                            onMaximumAgeChange={(age) => setMaximumAgee(age)}/>
            {getGenderPrefrence()}
        </PrimaryContainer>
    );
};

export default SelectCompanion;

const styles = StyleSheet.create({
    picker: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: scale(10)
    },
    mapFraction: {
        width: scale(300),
        height: verticalScale(60)
    },
    container: {
        padding: scale(10),
        borderRadius: 20, 
        backgroundColor: 'purple'
    },
    genderIcon: {
        width: scale(50),
        height: scale(50),
    },
    iconWithLabel: {
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: scale(10),
        margin: scale(10)
    }
});
