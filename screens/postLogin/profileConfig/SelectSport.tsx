import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

import { Appbar, Button } from "react-native-paper";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";

import { AppHeader } from "../../../components/general";
import { setInitialProfileConfigured } from "../../../redux/appState";
import { Layout2Piece } from "../../layouts";

const SelectSport = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const getHeader = () => 
    {
        const _goBack = () => {
            console.log("[SelectSport]: go back in config")
        }

        const _goNext = () => {
            console.log("[SelectSport]: advance in config");
            // navigation.navigate("")
            dispatch(setInitialProfileConfigured(true));
        }

        return(
            <AppHeader>
                <Appbar.BackAction style={{left: scale(20), position: 'absolute'}} onPress={_goBack} />
                <Button style={{right: scale(20), position: 'absolute'}} onPress={_goNext}>
                    NEXT
                </Button>
            </AppHeader>
        );
    }
    const getBody = () => 
    {
        return(
            <View style={{flex: 1, backgroundColor: 'green'}}></View>
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