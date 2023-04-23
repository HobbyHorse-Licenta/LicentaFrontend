import React, { useState } from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import {Text, useTheme} from 'react-native-paper'

import { FemaleSvg, MaleAndFemaleSvg, MaleSvg } from '../svg/general';
import { Gender } from '../../types';
import { PrimaryContainer, SvgView } from '../general';
import SelectAgeGap from './SelectAgeGap';
import SelectNumberOfPeople from './SelectNumberOfPeople';

interface Distance {
    label: string,
    value: number
}

const SelectCompanion = () => {
    
    const [selectedGender, setSelectedGender] = useState<Gender | undefined>();
    const [numberOfPartners, setNumberOfPartners] = useState();
    const [minimumAge, setMinimumAge] = useState();
    const [maximumAge, setMaximumAge] = useState();

    const theme = useTheme();
    
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
        if(selectedGender !== undefined)
            setSelectedGender(undefined)
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
                    <View style={[styles.iconWithLabel, selectedGender === undefined && {backgroundColor: theme.colors.tertiary}]}>
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
            <Text>Do you want to go in group or not?</Text>
            <SelectNumberOfPeople onChange={nr => setNumberOfPartners(nr)}></SelectNumberOfPeople>
            <Text>Which age gap are you confortable with for your companion?</Text>
            <SelectAgeGap onMinimumAgeChange={(age) => setMinimumAge(age)}
                            onMaximumAgeChange={(age) => setMaximumAge(age)}/>
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
