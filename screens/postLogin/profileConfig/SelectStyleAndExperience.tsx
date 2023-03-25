import React, {useState, useEffect} from 'react'
import {TouchableWithoutFeedback, View, StyleSheet, Pressable} from 'react-native'

import { useDispatch, useSelector } from 'react-redux';
import { scale, verticalScale } from 'react-native-size-matters';
import {Text, useTheme} from 'react-native-paper'

import { PrimaryContainer } from '../../../components/general';
import { SkateExperience, SkatePracticeStyles, SkatesType } from '../../../types';
import { SpacingStyles } from '../../../styles';
import { Layout2Piece } from '../../layouts';
import { ProfileConfigHeader } from '../../../components/profileConfig';
import { setSkatePracticeStyle, setSkateExperience } from '../../../redux/configProfileState';
import { HandDownSvg } from '../../../components/svg/general';
import PersonalInfo from './PersonalInfo';


const SelectStyleAndExperience = () => {

    const {skateType} = useSelector((state: any) => state.configProfile)
    const {skatePracticeStyle} = useSelector((state: any) => state.configProfile)
    const {skateExperience} = useSelector((state: any) => state.configProfile)
    const [selectedSkateStyle, setSelectedSkateStyle] = useState<SkatePracticeStyles | undefined>(skatePracticeStyle);
    const [selectedExperience, setSelectedExperience] = useState<SkateExperience | undefined>(skateExperience);
    const [goNextDisabled, setGoNextDisabled] = useState(true);
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
      dispatch(setSkatePracticeStyle(selectedSkateStyle));

      if(selectedSkateStyle != undefined && selectedExperience != undefined)
        setGoNextDisabled(false);

    }, [selectedSkateStyle])

    useEffect(() => {
        dispatch(setSkateExperience(selectedExperience));

        if(selectedSkateStyle != undefined && selectedExperience != undefined)
        setGoNextDisabled(false);
    }, [selectedExperience])
    

    const getPracticeStyleOptions = () => 
    {
        switch (skateType) {
            case SkatesType.AggressiveSkates:
                return (
                    <View style={[StyleSheet.absoluteFill, styles.optionView]}>
                        <Pressable onPress={() => setSelectedSkateStyle(SkatePracticeStyles.AggresiveSkating)} style={styles.skateStylesPressable}>
                            <Text style={getSkatePracticeTextStyle(SkatePracticeStyles.AggresiveSkating)}>{SkatePracticeStyles.AggresiveSkating}</Text>
                        </Pressable>
                        <View style={{backgroundColor: 'lightgrey', width: '100%', height: 1}}></View>
                        <Pressable onPress={() => setSelectedSkateStyle(SkatePracticeStyles.CasualSkating)} style={styles.skateStylesPressable}>
                            <Text style={getSkatePracticeTextStyle(SkatePracticeStyles.CasualSkating)}>{SkatePracticeStyles.CasualSkating}</Text>
                        </Pressable>
                    </View>
                )
                break;
            case SkatesType.CasualSkates:
                return(
                    <View style={[StyleSheet.absoluteFill, styles.optionView]} >
                        <Pressable onPress={() => setSelectedSkateStyle(SkatePracticeStyles.CasualSkating)} style={styles.skateStylesPressable}>
                            <Text style={getSkatePracticeTextStyle(SkatePracticeStyles.CasualSkating)}>{SkatePracticeStyles.CasualSkating}</Text>
                        </Pressable>
                        <View style={{backgroundColor: 'lightgrey', width: '100%', height: 1}}></View>
                        <Pressable onPress={() => setSelectedSkateStyle(SkatePracticeStyles.AggresiveSkating)} style={styles.skateStylesPressable}>
                            <Text style={getSkatePracticeTextStyle(SkatePracticeStyles.AggresiveSkating)}>{SkatePracticeStyles.AggresiveSkating}</Text>
                        </Pressable>
                        <View style={{backgroundColor: 'lightgrey', width: '100%', height: 1}}></View>
                        <Pressable onPress={() => setSelectedSkateStyle(SkatePracticeStyles.SpeedSkating)} style={styles.skateStylesPressable}>
                            <Text style={getSkatePracticeTextStyle(SkatePracticeStyles.SpeedSkating)}>{SkatePracticeStyles.SpeedSkating}</Text>
                        </Pressable>
                    </View>
                    
                )
                break;
            case SkatesType.SpeedSkates:
                return (
                    <View style={[StyleSheet.absoluteFill, styles.optionView]} >
                        <Pressable onPress={() => setSelectedSkateStyle(SkatePracticeStyles.SpeedSkating)} style={styles.skateStylesPressable}>
                            <Text style={getSkatePracticeTextStyle(SkatePracticeStyles.SpeedSkating)}>{SkatePracticeStyles.SpeedSkating}</Text>
                        </Pressable>
                        <View style={{backgroundColor: 'lightgrey', width: '100%', height: 1}}></View>
                        <Pressable onPress={() => setSelectedSkateStyle(SkatePracticeStyles.CasualSkating)} style={styles.skateStylesPressable}>
                            <Text style={getSkatePracticeTextStyle(SkatePracticeStyles.CasualSkating)}>{SkatePracticeStyles.CasualSkating}</Text>
                        </Pressable>
                    </View>
                )
                break;
        
            default:
                break;
        }
    }

    const getSkatePracticeTextStyle = (practiceStyle: SkatePracticeStyles) => {
        if(practiceStyle === selectedSkateStyle)
            return {margin: scale(10), color: theme.colors.tertiary}
        else return {margin: scale(10)} 
    }

    const getExperinceTextStyle = (experience: SkateExperience) => {
        if(experience === selectedExperience)
            return {margin: scale(10), color: theme.colors.tertiary}
        else return {margin: scale(10)} 
    }

    const getExperienceOptions = () => {
        const experienceValues = Object.values(SkateExperience);
        return (
            <View style={[StyleSheet.absoluteFill, styles.optionView]}>
                {
                    experienceValues.map((experienceLevel, index) => {
                        return(
                            <View key={index} style={[{width: '100%', flex: 1}, SpacingStyles.centeredContainer]}>
                                {(index != 0) && <View style={{backgroundColor: 'lightgrey', width: '100%', height: 1}}></View>}
                                <Pressable  onPress={() => setSelectedExperience(experienceLevel)} style={styles.experinceTextView}>
                                    <Text style={getExperinceTextStyle(experienceLevel)}>{experienceLevel}</Text>
                                </Pressable>
                            </View>
                        );
                    }) 
                }
            </View>
        )
    }

    const getBody = () => {
        return(
            <View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center'}]}>
                <Text variant='headlineSmall' >What do you want to pratice?</Text>
                <View style={styles.handIcon}>
                    <HandDownSvg></HandDownSvg>
                </View>
                <PrimaryContainer styleInput={{...SpacingStyles.shadow, ...styles.skateStyleOptions}}>
                    {getPracticeStyleOptions()}
                </PrimaryContainer>
                <PrimaryContainer styleInput={{...SpacingStyles.shadow, ...styles.experienceOptions}}>
                    {getExperienceOptions()}
                </PrimaryContainer>
            </View>
        );
    }

    return(
        <Layout2Piece
        header={ <ProfileConfigHeader disabled={goNextDisabled} backButton={true} nextScreen={'PersonalInfo'}/>}
        body={getBody()}
        ></Layout2Piece>     
    );
}

export default SelectStyleAndExperience;

const styles = StyleSheet.create({
    skateStyleOptions: {
        height: verticalScale(260),
        width: scale(210),
        margin: scale(10),
        padding: scale(20),
    },
    experienceOptions: {
        height: verticalScale(200),
        width: scale(210),
        margin: scale(10),
        padding: scale(20),
    },
    handIcon: {
        height: verticalScale(50),
        width: scale(50),
        margin: scale(10),
    },
    experinceTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    skateStylesPressable: {
        paddingHorizontal: scale(5),
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionView: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1
    }
});