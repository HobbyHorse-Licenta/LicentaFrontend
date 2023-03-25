import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { Text, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";


import { GeneralModal, Lottie, PrimaryContainer, SelectionCard } from "../../../components/general";
import { Layout2Piece } from "../../layouts";
import { Gender, SportName } from "../../../types";
import { ProfileConfigHeader, SelectAge, SelectGender } from "../../../components/profileConfig";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { setAge, setGender } from "../../../redux/configProfileState";

const PersonalInfo = () => {

    const {age, gender} = useSelector((state: any) => state.configProfile)

    const [finishDisabled, setFinishDisabled] = useState(true);
    const [selectedAge, setSelectedAge] = useState(age);
    const [selectedGender, setSelectedGender] = useState<Gender>(gender);


    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        if(selectedGender != undefined && selectedAge != undefined)
            setFinishDisabled(false);
        else setFinishDisabled(true);
    }, [selectedGender, selectedAge])

    useEffect(() => {
        dispatch(setGender(selectedGender));
    }, [selectedGender])

    useEffect(() => {
        dispatch(setAge(selectedAge));
    }, [selectedAge])
    
    
    const getBody = () => 
    {
        return(
            <View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.primary}]}>
                    <Lottie lottieRequire={require('../../../assets/lottieAnimations/fingerprint.json')}
                    width={100} height={100} adjustMask={22} maskColor={theme.colors.primary}/>
                    <Text variant="headlineLarge" >Make it about you</Text>
                    <View style={{flexDirection: 'row'}}>
                        <SelectAge onChange={(age => setSelectedAge(age))}></SelectAge>
                        <SelectGender onChange={(gender => setSelectedGender(gender))}></SelectGender>
                    </View>
                   
            </View>
            
        );
    }

    return(
        <Layout2Piece
            header={ <ProfileConfigHeader backButton={true} disabled={finishDisabled} doneConfig={true}></ProfileConfigHeader>}
            body={getBody()}
        ></Layout2Piece>
    );
};

export default PersonalInfo;

const styles = StyleSheet.create({
    mainContainer: {
        height: verticalScale(520),
        width: scale(300),
        margin: scale(10),
        padding: scale(20),
    },
    radioButtonContainer: {
        position: 'absolute',
        bottom: verticalScale(10),
        left: scale(20)
    },
    genderIcon: {
        width: scale(50),
        height: scale(50),
        backgroundColor: 'green'
    },
    iconWithLabel: {
        justifyContent: 'center',
        alignItems:'center'
    }
});