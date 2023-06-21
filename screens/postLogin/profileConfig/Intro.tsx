import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Text } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from 'react-native-animatable';


import { PrimaryContainer, SelectionCard } from "../../../components/general";
import { Layout2Piece } from "../../layouts";
import { SpacingStyles } from "../../../styles";
import { SportName } from "../../../types";
import { InlineSkatesSvg } from "../../../components/svg/sports";
import { setSport } from "../../../redux/configProfileState";
import { ProfileConfigHeader } from "../../../components/profileConfig";

const Intro = () => {

    const {sport} = useSelector((state: any) => state.configProfile)

    const [goNextDisabled, setGoNextDisabled] = useState(false);

    const dispatch = useDispatch();
    
    const getBody = () => 
    {
        return(
            <View style={[StyleSheet.absoluteFill,SpacingStyles.centeredContainer]}>
                
                <View style={[{marginBottom: verticalScale(60)}, SpacingStyles.centeredContainer]}>
                
                    <Animatable.View animation='pulse' iterationCount={Infinity} duration={3000}>
                        <View style={{width: 170, height: 170, marginBottom: verticalScale(60)}}>
                            <InlineSkatesSvg></InlineSkatesSvg>
                        </View>
                    </Animatable.View>
                

                    <View style={{margin: scale(20)}}>
                        <Text variant='headlineMedium' style={{marginBottom: verticalScale(5), textAlign: "center"}}>Profile configuration</Text>
                        <Text variant="labelLarge" style={{ textAlign: "center"}}>
                            There is some setup involved so we can provide you with the best skating experience
                        </Text>
                    </View>

                </View>

                
            </View>
        );
    }

    return(
        <Layout2Piece
            header={ <ProfileConfigHeader backButton={false} disabled={goNextDisabled}  nextScreen={'SelectSkates'}></ProfileConfigHeader>}
            body={getBody()}
        ></Layout2Piece>
    );
};

export default Intro;

const styles = StyleSheet.create({
    optionTile: {
        height: verticalScale(230),
        width: scale(150),
        margin: scale(10),
        padding: scale(20),
    },
    radioButtonContainer: {
        position: 'absolute',
        bottom: verticalScale(10),
        left: scale(20)
    }
});