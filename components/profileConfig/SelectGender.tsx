import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Pressable} from 'react-native'

import {Text, useTheme} from 'react-native-paper'
import { scale } from 'react-native-size-matters';
import { Gender } from '../../types';

import { PrimaryContainer, SvgView } from '../general';
import { FemaleSvg, MaleSvg } from '../svg/general';

interface SelectGenderInput{
    initialValue: Gender,
    onChange: Function
}
const SelectGender = ({onChange, initialValue} : SelectGenderInput) => {
    const theme = useTheme();

    const [selectedGender, setSelectedGender] = useState<Gender | undefined>(initialValue);

    useEffect(() => {
        onChange(selectedGender);
    }, [selectedGender])
    
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
    return(
        <PrimaryContainer styleInput={{...styles.container,  backgroundColor: theme.colors.background}}>
                        <Text>Gender:</Text>
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
                            
                        </View>
                    </PrimaryContainer>
    );
};

export default SelectGender;

const styles = StyleSheet.create({
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