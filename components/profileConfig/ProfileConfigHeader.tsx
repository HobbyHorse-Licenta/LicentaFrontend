import React, {useState, useEffect} from "react";
import {View} from 'react-native'

import { Appbar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import { AppHeader, Button, GeneralModal } from "../general";
import { useDispatch, useSelector } from "react-redux";
import { setInitialProfileConfigured } from "../../redux/appState";

interface ConfigHeaderInput {
    backButton?: boolean,
    nextScreen?: string,
    doneConfig?: boolean
    disabled?: boolean
}
const ProfileConfigHeader = ({backButton, nextScreen, disabled, doneConfig} : ConfigHeaderInput) => {

    const {sport, skateType, skatePracticeStyle, skateExperience, age, gender } = useSelector((state: any) => state.configProfile)

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const displayModalForSeconds = 10;

    useEffect(() => {
        if(infoModalVisible === true)
        {
            setTimeout(() => closeModalAndAdvance(), displayModalForSeconds * 1000);
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
        setInfoModalVisible(false);
        dispatch(setInitialProfileConfigured(true));
    }
    const endProfileConfiguration = () => {
        setInfoModalVisible(true);
    }

    const getModalInfo = () => {
        return(
            <View>
                <Text>Sport selected: {sport}</Text>
                <Text>Skates selected: {skateType}</Text>
                <Text>Want to practice: {skatePracticeStyle}</Text>
                <Text>Your experince level: {skateExperience}</Text>
                {(gender != undefined) && <Text>Gender: {gender}</Text>}
                {(age != undefined) && <Text>Age: {age}</Text>}
            </View>
           
        );
    }
    return(
        <AppHeader>
            {(backButton !== undefined) && <Appbar.BackAction style={{left: scale(20), position: 'absolute'}} onPress={goBack}/>}
            {(nextScreen !== undefined) && <Button disabled={disabled} text="NEXT" callBack={goNext} style={{position: 'absolute', right: scale(20)}}/>}
            {(doneConfig === true) && <Button disabled={disabled} text="DONE" callBack={endProfileConfiguration} style={{position: 'absolute', right: scale(20)}}/>}
            <GeneralModal visible={infoModalVisible} onDismiss={closeModalAndAdvance}>
                <CountdownCircleTimer
                    isPlaying
                    duration={displayModalForSeconds}
                    colors={['#000000', '#000000']}
                    colorsTime={[displayModalForSeconds, 1]}
                >
                    {({ remainingTime }) => <Text>{remainingTime}</Text>}
                </CountdownCircleTimer>
                {getModalInfo()}
            </GeneralModal>
        </AppHeader>
    );
}

export default ProfileConfigHeader;