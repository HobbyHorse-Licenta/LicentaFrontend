import React, {useState, useEffect} from "react";

import { Appbar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

import { AppHeader, Button, GeneralModal } from "../general";
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
    const [infoModalVisible, setInfoModalVisible] = useState(false);

    useEffect(() => {
        if(infoModalVisible === true)
        {
            setTimeout(() => closeModalAndAdvance(), 5000);
        }
      }, [infoModalVisible]);

    const goNext = () => {
        if(nextScreen != undefined)
            navigation.navigate(nextScreen as never);
    }
    const goBack = () => {
        if(backButton != undefined)
        {
            if(navigation.canGoBack())
                navigation.goBack();
        }
    }

    const closeModalAndAdvance = () => {
        console.log("FACEM TREABA");
        setInfoModalVisible(false);
        dispatch(setInitialProfileConfigured(true));
    }
    const endProfileConfiguration = () => {
        setInfoModalVisible(true);
    }
    return(
        <AppHeader>
            {(backButton !== undefined) && <Appbar.BackAction style={{left: scale(20), position: 'absolute'}} onPress={goBack}/>}
            {(nextScreen !== undefined) && <Button disabled={disabled} text="NEXT" callBack={goNext} style={{position: 'absolute', right: scale(20)}}/>}
            {(doneConfig === true) && <Button disabled={disabled} text="DONE" callBack={endProfileConfiguration} style={{position: 'absolute', right: scale(20)}}/>}
            <GeneralModal visible={infoModalVisible} onDismiss={closeModalAndAdvance}>
                <Text style={{paddingVertical: verticalScale(100)}}>CIAO</Text>
            </GeneralModal>
        </AppHeader>
    );
}

export default ProfileConfigHeader;