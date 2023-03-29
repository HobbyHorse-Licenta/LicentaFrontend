import React, {useState, useEffect} from "react";
import {View, StyleSheet} from 'react-native'

import { Appbar, Text, useTheme } from "react-native-paper";
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
    const theme = useTheme();
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const displayModalForSeconds = 13;

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
        //createProfile();
        setInfoModalVisible(false);
        dispatch(setInitialProfileConfigured(true));
    }
    const endProfileConfiguration = () => {
        setInfoModalVisible(true);
    }

    const getModalInfo = () => {
        return(
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Sport selected: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{sport}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Skates selected: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{skateType}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Want to practice: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{skatePracticeStyle}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Your experince level: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{skateExperience}</Text>
                </View>
                {(gender != undefined) && 
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Gender: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{gender}</Text>
                </View>}
                {(age != undefined) &&
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCategory}>Age: </Text>
                    <Text style={[styles.textCategory,{color: theme.colors.tertiary}]}>{age}</Text>
                </View>}
            </View>
           
        );
    }
    return(
        <AppHeader>
            {(backButton !== undefined) && <Appbar.BackAction style={{left: scale(20), position: 'absolute'}} onPress={goBack}/>}
            {(nextScreen !== undefined) && <Button disabled={disabled} text="NEXT" callBack={goNext} style={{position: 'absolute', right: scale(20)}}/>}
            {(doneConfig === true) && <Button disabled={disabled} text="DONE" callBack={endProfileConfiguration} style={{position: 'absolute', right: scale(20)}}/>}
            <GeneralModal visible={infoModalVisible} onDismiss={closeModalAndAdvance}>
                <View style={styles.timer}>
                    <CountdownCircleTimer
                        strokeWidth={4}
                        isPlaying
                        duration={displayModalForSeconds}
                        colors={['#000000', '#000000']}
                        colorsTime={[displayModalForSeconds, 1]}
                        size={scale(60)}
                    >
                        {({ remainingTime }) => <Text>{remainingTime}</Text>}
                    </CountdownCircleTimer>
                </View>
                
                {getModalInfo()}
            </GeneralModal>
        </AppHeader>
    );
}

export default ProfileConfigHeader;

const styles = StyleSheet.create({
    timer: {
       margin: scale(20)
    },
    textCategory: {
        marginLeft: scale(5),
        marginTop: scale(5),
        marginBottom: scale(5),
    },
    textValue: {
        marginRight: scale(5),
        marginTop: scale(5),
        marginBottom: scale(5),
        fontWeight: 'bold'
    }
});