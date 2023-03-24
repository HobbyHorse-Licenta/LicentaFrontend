import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Appbar, Text, RadioButton, useTheme } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { AppHeader, PrimaryContainer, Button, SelectionCard } from "../../../components/general";
import { setInitialProfileConfigured } from "../../../redux/appState";
import { Layout2Piece } from "../../layouts";
import { SpacingStyles } from "../../../styles";
import { SportName } from "../../../types";
import { InlineSkatesSvg } from "../../../components/svg/sports";
import SelectSkates from "./SelectSkates";
import { setSport } from "../../../redux/configProfileState";

const SelectSport = () => {

    const {sport} = useSelector((state: any) => state.configProfile)

    const [selectedSport, setSelectedSport] = useState<SportName | undefined>(sport);
    const [goNextDisabled, setGoNextDisabled] = useState(true);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setSport(selectedSport));
        if(selectedSport)
            setGoNextDisabled(false);
        else setGoNextDisabled(true);
    }, [selectedSport])
    
    const getHeader = () => 
    {
        const _goBack = () => {
            console.log("[SelectSport]: go back in config")
        }

        const _goNext = () => {
            console.log("[SelectSport]: advance in config");
            navigation.navigate(SelectSkates as never);
        }

        return(
            <AppHeader>
                <Appbar.BackAction style={{left: scale(20), position: 'absolute'}} onPress={_goBack} />
                <Button disabled={goNextDisabled} text="NEXT" callBack={_goNext} style={{position: 'absolute', right: scale(20)}}/>
            </AppHeader>
        );
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
                    <SelectionCard onSelect={() => setSelectedSport(SportName.InlineSkating)}
                                   onDeselect={() => setSelectedSport(undefined)}
                                   text={'Inline Skates'}>
                        <InlineSkatesSvg></InlineSkatesSvg>
                    </SelectionCard>
                </View>
            </View>
        );
    }
    return(
        <Layout2Piece
            header={ getHeader()}
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