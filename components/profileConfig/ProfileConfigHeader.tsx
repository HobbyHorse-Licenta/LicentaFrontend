import React, {ReactNode} from "react";

import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

import { AppHeader, Button } from "../general";
import { useDispatch } from "react-redux";
import { setInitialProfileConfigured } from "../../redux/appState";

interface ConfigHeaderInput {
    backButton?: boolean,
    nextScreen?: string,
    doneConfig?: boolean
    disabled?: boolean
}
const ProfileConfigHeader = ({backButton, nextScreen, disabled, doneConfig} : ConfigHeaderInput) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const goNext = () => {
        if(nextScreen != undefined)
            navigation.navigate(nextScreen);
    }
    const goBack = () => {
        if(backButton != undefined)
        {
            if(navigation.canGoBack())
                navigation.goBack();
        }
    }

    const endProfileConfiguration = () => {
        dispatch(setInitialProfileConfigured(true));
    }
    return(
        <AppHeader>
            {(backButton !== undefined) && <Appbar.BackAction style={{left: scale(20), position: 'absolute'}} onPress={goBack}/>}
            {(nextScreen !== undefined) && <Button disabled={disabled} text="NEXT" callBack={goNext} style={{position: 'absolute', right: scale(20)}}/>}
            {(doneConfig === true) && <Button disabled={disabled} text="DONE" callBack={endProfileConfiguration} style={{position: 'absolute', right: scale(20)}}/>}
        </AppHeader>
    );
}

export default ProfileConfigHeader;