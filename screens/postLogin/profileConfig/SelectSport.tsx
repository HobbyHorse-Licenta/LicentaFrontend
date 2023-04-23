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

const SelectSport = () => {

    const {sport} = useSelector((state: any) => state.configProfile)

    const [selectedSport, setSelectedSport] = useState<SportName | undefined>(sport);
    const [goNextDisabled, setGoNextDisabled] = useState(true);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setSport(selectedSport));
        if(selectedSport)
            setGoNextDisabled(false);
        else setGoNextDisabled(true);
    }, [selectedSport])
    

    const flipSelectState = () =>
    {
        if(selectedSport != undefined)
            setSelectedSport(undefined);
        else setSelectedSport(SportName.InlineSkating);
    }
    
    const getBody = () => 
    {
        return(
            <View style={[StyleSheet.absoluteFill,SpacingStyles.centeredContainer]}>
                <Text variant='headlineMedium' style={{margin: verticalScale(15)}}>Choose a sport:</Text>
                <View style={[{flexDirection: 'row'}]}>
                    <Pressable onPress={() => console.log("[SelectSport]: new sport suggestion")}>
                        <PrimaryContainer styleInput={{...SpacingStyles.shadow, ...styles.optionTile}}>
                            <Text>Suggest</Text>
                            <Text>Another</Text>
                            <Text>Sport</Text>
                        </PrimaryContainer>
                    </Pressable>
                    {
                        (selectedSport != undefined) ?
                        (
                            <SelectionCard selectState={selectedSport != undefined}
                                        flipSelectState={() => flipSelectState()}
                                    text={'Inline Skates'}>
                                <InlineSkatesSvg></InlineSkatesSvg>
                            </SelectionCard>
                        ):
                        (
                            <Animatable.View animation='pulse' iterationCount={Infinity} duration={3000}>
                                <SelectionCard selectState={selectedSport != undefined}
                                                flipSelectState={() => flipSelectState()}
                                            text={'Inline Skates'}>
                                    <InlineSkatesSvg></InlineSkatesSvg>
                                </SelectionCard>
                            </Animatable.View>
                        )
                    } 
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

export default SelectSport;

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