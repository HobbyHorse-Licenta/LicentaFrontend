import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';


import { Lottie, PrimaryContainer, SelectionCard } from "../../../components/general";
import { Layout2Piece } from "../../layouts";
import { SpacingStyles } from "../../../styles";
import { SportName } from "../../../types";
import { InlineSkatesSvg } from "../../../components/svg/sports";
import { setSport } from "../../../redux/configProfileState";
import { ProfileConfigHeader, SelectGender } from "../../../components/profileConfig";
import { FemaleSvg, MaleSvg } from "../../../components/svg/general";

const PersonalInfo = () => {

    const {sport} = useSelector((state: any) => state.configProfile)

    const [selectedSport, setSelectedSport] = useState<SportName | undefined>(sport);
    const [finishDisabled, setFinishDisabled] = useState(false);

    const dispatch = useDispatch();
    
    
    
    const getBody = () => 
    {
        return(
            <View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center'}]}>
                <PrimaryContainer styleInput={{...SpacingStyles.shadow, ...styles.mainContainer}}>
                    <Lottie lottieRequire={require('../../../assets/lottieAnimations/fingerprint.json')}
                    width={100} height={100} adjustMask={22}/>
                    <SelectGender></SelectGender>
                    
                </PrimaryContainer>
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